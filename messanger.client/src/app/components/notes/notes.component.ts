import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NotesStateService } from '../../services/notes-state.service';
import { Subscription } from 'rxjs';
import { DeviceTypeService } from '../../services/device-type-service';

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
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      this.notes = JSON.parse(savedNotes);
    } else {
      // Демо-данные
      this.notes = [
        {
          id: 1,
          title: 'Первая заметка',
          content: 'Это пример содержимого первой заметки. Здесь может быть очень длинный текст, который не поместится в карточку и будет обрезан с многоточием.',
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Вторая заметка',
          content: 'А это содержимое второй заметки. Тоже достаточно длинное, чтобы показать, как работает обрезка текста в карточках.',
          createdAt: new Date()
        },
        {
          id: 3,
          title: 'Короткая заметка',
          content: 'Это короткая заметка для примера.',
          createdAt: new Date()
        }
      ];
      this.saveNotes();
    }
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
