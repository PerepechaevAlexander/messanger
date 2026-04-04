import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-modal',
  standalone: false,
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent implements OnInit {
  @Input() note: Note | null = null;
  @Input() isOpen = false;
  @Input() isNewNote = false; // Новый входной параметр для определения новой заметки
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveNote = new EventEmitter<Note>();

  isEditMode = false;

  // Отдельные поля для формы редактирования
  editTitle: string = '';
  editContent: string = '';

  ngOnInit() {
    this.resetEditState();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['note'] && this.note) {
      this.resetEditState();
    }
    // Если открываем модалку для новой заметки, сразу включаем режим редактирования
    if (changes['isOpen'] && this.isOpen && this.isNewNote) {
      this.isEditMode = true;
      this.editTitle = '';
      this.editContent = '';
    }
  }

  resetEditState() {
    if (this.note) {
      this.editTitle = this.note.title;
      this.editContent = this.note.content;
    }
    this.isEditMode = false;
  }

  close() {
    this.closeModal.emit();
    this.resetEditState();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  onEscapePress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  toggleEditMode() {
    if (this.isEditMode) {
      // Сохраняем изменения
      if (this.isNewNote) {
        // Создаем новую заметку
        const newNote: Note = {
          id: Date.now(),
          isDeleted: false,
          creationDateTime: new Date(),
          lastModifyDateTime: new Date(),
          lastModifyUserId: 1,
          title: this.editTitle,
          content: this.editContent
        };
        this.saveNote.emit(newNote);
        // После сохранения новой заметки переключаемся в режим просмотра
        this.isEditMode = false;
        this.isNewNote = false;
        // Обновляем note для отображения в режиме просмотра
        this.note = newNote;
      } else if (this.note) {
        const updatedNote: Note = {
          ...this.note,
          title: this.editTitle,
          content: this.editContent
        };
        this.saveNote.emit(updatedNote);
        // После сохранения переключаемся в режим просмотра
        this.isEditMode = false;
        this.note = updatedNote;
      }
      this.isEditMode = false;
    } else {
      // Переключаемся в режим редактирования
      this.isEditMode = true;
    }
  }

  // Новый метод для проверки, можно ли сохранить
  canSave(): boolean {
    return this.editTitle.trim() !== '' && this.editContent.trim() !== '';
  }
}
