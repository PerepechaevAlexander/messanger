import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { NotesStateService } from '../../services/notes-state.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isSidebarCollapsed = false;
  currentPageTitle = '';
  showAddButton = false;
  isMobile = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private sidebarState: SidebarStateService,
    private notesState: NotesStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.sidebarState.collapsed$.subscribe(collapsed => {
        this.isSidebarCollapsed = collapsed;
      })
    );

    this.subscriptions.push(
      this.sidebarState.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
      })
    );

    // Отслеживаем изменения маршрута
    this.subscriptions.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updatePageTitle();
        this.updateAddButtonVisibility();
      })
    );

    // Устанавливаем начальные значения
    this.updatePageTitle();
    this.updateAddButtonVisibility();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Метод для открытия мобильного меню
  openMobileMenu() {
    if (this.isMobile) {
      this.sidebarState.toggleMobileOpen();
    }
  }

  onCreateNote() {
    this.notesState.triggerCreateNote();
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

  private updateAddButtonVisibility() {
    this.showAddButton = this.router.url.includes('/notes');
  }
}
