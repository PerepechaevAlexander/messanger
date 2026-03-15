import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  private mobileOpenSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  collapsed$ = this.collapsedSubject.asObservable();
  mobileOpen$ = this.mobileOpenSubject.asObservable();
  isMobile$ = this.isMobileSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeState();
  }

  toggleCollapsed(): void {
    // Используем snapshot для проверки текущего значения
    this.isMobile$.pipe(
      map(isMobile => {
        // Не переключаем состояние на мобильных устройствах
        if (!isMobile) {
          const newValue = !this.collapsedSubject.value;
          this.collapsedSubject.next(newValue);
          localStorage.setItem('sidebarCollapsed', JSON.stringify(newValue));
        }
      })
    ).subscribe();
  }

  toggleMobileOpen(): void {
    this.isMobile$.pipe(
      map(isMobile => {
        // Переключаем состояние ТОЛЬКО на мобильных устройствах
        if (isMobile) {
          const newValue = !this.mobileOpenSubject.value;
          this.mobileOpenSubject.next(newValue);
          document.body.style.overflow = newValue ? 'hidden' : '';
        }
      })
    ).subscribe();
  }

  closeMobile(): void {
    this.isMobile$.pipe(
      map(isMobile => {
        // Переключаем состояние ТОЛЬКО на мобильных устройствах и если сайдбар открыт
        if (isMobile && this.mobileOpenSubject.value) {
          this.mobileOpenSubject.next(false);
          document.body.style.overflow = '';
        }
      })
    ).subscribe();
  }

  private initializeState(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Загружаем сохраненное состояние
      this.loadSavedState();

      // Настраиваем отслеживание resize
      fromEvent(window, 'resize')
        .pipe(
          map(() => window.innerWidth <= 768),
          startWith(window.innerWidth <= 768),
          distinctUntilChanged()
        )
        .subscribe(isMobile => {
          this.isMobileSubject.next(isMobile);

          if (!isMobile) {
            this.mobileOpenSubject.next(false);
            document.body.style.overflow = '';
          }
        });
    }
  }

  private loadSavedState(): void {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      this.collapsedSubject.next(JSON.parse(savedState));
    }
  }
}
