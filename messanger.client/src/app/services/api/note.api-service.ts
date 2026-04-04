import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Note } from '../../models/note';

@Injectable({
  providedIn: 'root'
})
// Апи-сервис для работы с заметками
export class NoteApiService {

  constructor(private http: HttpClient) { }

  // Получить заметки.
  get() {
    return this.http.get<Note[]>("/Note/Get")
  }
}
