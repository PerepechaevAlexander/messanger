import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobileSubject.asObservable();
  isOpen$ = this.isOpenSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeState();
  }

  /* Закрывает сайдбар. */
  close(): void {
    if (this.isOpenSubject.value) {
      this.isOpenSubject.next(false);
    }
  }

  /* Переключает состояние сайдбара. */
  toggle(): void {
    const newValue = !this.isOpenSubject.value;
    this.isOpenSubject.next(newValue);
  }

  private initializeState(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Настраиваем отслеживание resize
      fromEvent(window, 'resize')
        .pipe(
          map(() => window.innerWidth <= 768),
          startWith(window.innerWidth <= 768),
          distinctUntilChanged()
        )
        .subscribe(isMobile => {
          this.isMobileSubject.next(isMobile);
          this.isOpenSubject.next(false);
        });
    }
  }
}
