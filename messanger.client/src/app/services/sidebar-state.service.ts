import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private collapsedSubject = new BehaviorSubject<boolean>(false);
  private mobileOpenSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  // Флаг для отслеживания инициализации
  private initialized = false;

  collapsed$ = this.collapsedSubject.asObservable();
  mobileOpen$ = this.mobileOpenSubject.asObservable();
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    // Загружаем сохраненное состояние ТОЛЬКО один раз при создании сервиса
    this.loadSavedState();

    // Проверяем размер экрана при старте
    this.checkScreenSize();

    // Добавляем слушатель события resize
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private loadSavedState(): void {
    // Загружаем состояние только если еще не инициализированы
    if (!this.initialized) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        this.collapsedSubject.next(JSON.parse(savedState));
      }
      this.initialized = true;
    }
  }

  toggleCollapsed(): void {
    // Не переключаем состояние на мобильных устройствах
    if (this.isMobileSubject.value) {
      return;
    }

    const newValue = !this.collapsedSubject.value;
    this.collapsedSubject.next(newValue);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newValue));
  }

  toggleMobileOpen(): void {
    // Работает только на мобильных устройствах
    if (!this.isMobileSubject.value) {
      return;
    }

    const newValue = !this.mobileOpenSubject.value;
    this.mobileOpenSubject.next(newValue);

    // Блокируем скролл body при открытом меню
    document.body.style.overflow = newValue ? 'hidden' : '';
  }

  closeMobile(): void {
    if (this.isMobileSubject.value && this.mobileOpenSubject.value) {
      this.mobileOpenSubject.next(false);
      document.body.style.overflow = '';
    }
  }

  checkScreenSize(): void {
    const isMobile = window.innerWidth <= 768;
    const wasMobile = this.isMobileSubject.value;

    // Обновляем только если значение действительно изменилось
    if (wasMobile !== isMobile) {
      this.isMobileSubject.next(isMobile);

      // При переходе с десктопа на мобильный ИЛИ при переходе с мобильного на десктоп
      if (!wasMobile && isMobile || wasMobile && !isMobile) {
        this.mobileOpenSubject.next(false);
        document.body.style.overflow = '';
      }
    }
  }

  get collapsedValue(): boolean {
    return this.collapsedSubject.value;
  }

  get mobileOpenValue(): boolean {
    return this.mobileOpenSubject.value;
  }

  get isMobileValue(): boolean {
    return this.isMobileSubject.value;
  }
}
