import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { filter, Subscription } from 'rxjs';
import { DeviceTypeService } from '../../services/device-type-service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  isMobile = false;
  isSidebarOpen = false;
  
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
    private sidebarStateService: SidebarStateService,
    private deviceTypeService: DeviceTypeService,
  ) {
    this.activeRoute = this.router.url;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.deviceTypeService.isMobile$.subscribe(isMobile => {
          this.isMobile = isMobile;
      })
    );

    this.subscriptions.push(
      this.sidebarStateService.isOpen$.subscribe(isOpen => {
        this.isSidebarOpen = isOpen;
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
        this.sidebarStateService.close();
      })
    );
  }

  ngOnDestroy() {
    // Отписываемся от всех подписок
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigateTo(route: string): void {
    if (this.router.url === route) {
      this.sidebarStateService.close();
    }

    this.router.navigate([route]);
  }

  onOverlayClick(event: MouseEvent) {
    // Закрываем меню при клике на оверлей
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.sidebarStateService.close();
    }
  }
}
