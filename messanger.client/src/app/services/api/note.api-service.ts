import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Note } from '../../models/note';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
// Апи-сервис для работы с заметками
export class NoteApiService {

  constructor(private http: HttpClient) { }

  // Получить заметки.
  get() {
    return this.http.get<Note[]>(`${environment.apiUrl}/Note/Get`)
  }
}
