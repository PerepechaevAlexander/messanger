import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesStateService {
  private createNoteSource = new Subject<void>();
  createNote$ = this.createNoteSource.asObservable();

  triggerCreateNote() {
    this.createNoteSource.next();
  }
}
