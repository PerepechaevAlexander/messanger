import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarStateService } from '../../services/sidebar-state.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  isMobile = false;
  sidebarCollapsed = false;
  mobileMenuOpen = false;
  currentPageTitle = 'Главная';

  constructor(
    private sidebarState: SidebarStateService,
    private router: Router
  ) { }

  ngOnInit() {
    // Подписываемся на изменения состояния
    this.sidebarState.isMobile$.subscribe(isMobile => {
      if (this.isMobile !== isMobile) {
        this.isMobile = isMobile;
      }
    });

    this.sidebarState.collapsed$.subscribe(collapsed => {
      if (this.sidebarCollapsed !== collapsed) {
        this.sidebarCollapsed = collapsed;
      }
    });

    this.sidebarState.mobileOpen$.subscribe(open => {
      if (this.mobileMenuOpen !== open) {
        this.mobileMenuOpen = open;
      }
    });

    // Отслеживаем изменения маршрута для обновления заголовка
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updatePageTitle();
    });

    // Устанавливаем начальный заголовок
    this.updatePageTitle();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.sidebarState.checkScreenSize();
  }

  toggleMobileMenu() {
    this.sidebarState.toggleMobileOpen();
  }

  closeMobileMenu() {
    this.sidebarState.closeMobile();
  }

  private updatePageTitle() {
    const url = this.router.url;
    if (url.includes('/notes')) {
      this.currentPageTitle = 'Заметки';
    } else if (url.includes('/about')) {
      this.currentPageTitle = 'О нас';
    } else if (url.includes('/contact')) {
      this.currentPageTitle = 'Контакты';
    } else if (url.includes('/settings')) {
      this.currentPageTitle = 'Настройки';
    } else {
      this.currentPageTitle = 'Главная';
    }
  }
}
