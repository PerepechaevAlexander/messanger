import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  @Input() mobileMenuOpen: boolean = false;
  @Output() closeMobileMenu = new EventEmitter<void>();

  isCollapsed = false;
  isMobile = false;
  
  private subscriptions: Subscription[] = [];

  menuItems = [
    { label: 'Хуй', route: '/', icon: '🏠' },
    { label: 'Заметки', route: '/notes', icon: '📒' },
    { label: 'Говно', route: '/about', icon: 'ℹ️' },
    { label: 'И', route: '/contact', icon: '📧' },
    { label: 'Муравей', route: '/settings', icon: 'fas fa-cog' }
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

        // На мобильных устройствах закрываем меню после навигации
        if (this.isMobile) {
          this.closeMobileMenu.emit();
        }
      })
    );
  }

  ngOnDestroy() {
    // Отписываемся от всех подписок
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarState.toggleMobileOpen();
    } else {
      this.sidebarState.toggleCollapsed();
    }
  }

  navigateTo(route: string): void {
    // Не делаем ничего, если уже на этом маршруте
    if (this.router.url === route) {
      return;
    }

    this.router.navigate([route]);
  }

  onOverlayClick(event: MouseEvent) {
    // Закрываем мобильное меню при клике на оверлей
    if ((event.target as HTMLElement).classList.contains('mobile-overlay')) {
      this.closeMobileMenu.emit();
    }
  }
}
