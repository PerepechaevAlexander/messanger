import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  mobileMenuOpen = false;
  isCollapsed = false;
  isMobile = false;
  
  private subscriptions: Subscription[] = [];

  menuItems = [
    { label: 'Главная', route: '/', icon: '🏠' },
    { label: 'Заметки', route: '/notes', icon: '📒' },
    { label: 'И', route: '/about', icon: 'ℹ️' },
    { label: 'Муравей', route: '/contact', icon: '📧' }
  ];

  activeRoute: string = '/';

  constructor(
    private router: Router,
    private sidebarState: SidebarStateService
  ) {
    this.activeRoute = this.router.url;
  }

  ngOnInit() {
    // Подписываемся на изменения состояния
    this.subscriptions.push(
      this.sidebarState.collapsed$.subscribe(collapsed => {
          this.isCollapsed = collapsed;
      })
    );

    this.subscriptions.push(
      this.sidebarState.isMobile$.subscribe(isMobile => {
          this.isMobile = isMobile;
      })
    );

    this.subscriptions.push(
      this.sidebarState.mobileOpen$.subscribe(open => {
          this.mobileMenuOpen = open;
      })
    );

    // Отслеживаем изменения маршрута
    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {

        // Обновляем активный маршрут
        this.activeRoute = this.router.url;

        // Закрываем меню после навигации
        this.toggleSidebar();
      })
    );
  }

  ngOnDestroy() {
    // Отписываемся от всех подписок
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigateTo(route: string): void {
    // Не делаем ничего, если уже на этом маршруте
    if (this.router.url === route) {
      this.toggleSidebar();
    }

    this.router.navigate([route]);
  }

  onOverlayClick(event: MouseEvent) {
    // Закрываем меню при клике на оверлей
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.toggleSidebar();
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarState.toggleMobileOpen();
    } else {
      this.sidebarState.toggleCollapsed();
    }
  }
}
