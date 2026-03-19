import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpenSubject.asObservable();

  constructor() {
    this.isOpenSubject.next(false);
  }

  /** Закрывает сайдбар. */
  close(): void {
    if (this.isOpenSubject.value) {
      this.isOpenSubject.next(false);
    }
  }

  /** Переключает состояние сайдбара. */
  toggle(): void {
    const newValue = !this.isOpenSubject.value;
    this.isOpenSubject.next(newValue);
  }
}
