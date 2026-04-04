import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { NotesStateService } from '../../services/notes-state.service';
import { Subscription } from 'rxjs';
import { DeviceTypeService } from '../../services/device-type-service';
import { NoteApiService } from '../../services/api/note.api-service';

@Component({
  selector: 'app-notes',
  standalone: false,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  isModalOpen = false;
  isNewNote = false; // Флаг для отслеживания создания новой заметки
  isMobile = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private notesState: NotesStateService,
    private deviceTypeService: DeviceTypeService,
    private noteApiService: NoteApiService
  ) { }

  ngOnInit() {
    this.loadNotes();

    // Подписываемся на события создания заметки
    this.subscriptions.push(
      this.notesState.createNote$.subscribe(() => {
        this.createNote();
      })
    );

    this.subscriptions.push(
      this.deviceTypeService.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadNotes() {
    this.noteApiService.get().subscribe((res) => {
      this.notes = res;
    })
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  // Метод для открытия существующей заметки
  openNote(note: Note) {
    this.selectedNote = note;
    this.isNewNote = false;
    this.isModalOpen = true;
  }

  // Новый метод для создания заметки
  createNote() {
    this.selectedNote = null;
    this.isNewNote = true;
    this.isModalOpen = true;
  }

  // Метод для сохранения заметки (новой или отредактированной)
  saveNote(note: Note) {
    if (this.isNewNote) {
      // Добавляем новую заметку в начало списка
      this.notes.unshift(note);
      // Обновляем selectedNote, чтобы модалка отображала сохраненную заметку
      this.selectedNote = note;
      this.isNewNote = false;
    } else {
      // Обновляем существующую
      const index = this.notes.findIndex(n => n.id === note.id);
      if (index !== -1) {
        this.notes[index] = note;
      }
    }
    this.saveNotes();
    // Модалка не закрывается, а остается открытой в режиме просмотра
  }

  deleteNote(id: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    if (confirm('Вы уверены, что хотите удалить заметку?')) {
      this.notes = this.notes.filter(note => note.id !== id);
      this.saveNotes();

      if (this.selectedNote?.id === id) {
        this.closeModal();
      }
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedNote = null;
    this.isNewNote = false;
  }

  truncateContent(content: string, maxLength: number = 150): string {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + '...';
  }
}
