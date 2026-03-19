import { Component, OnInit } from '@angular/core';
import { SidebarStateService } from '../../services/sidebar-state.service';
import { Subscription } from 'rxjs';

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

  private subscriptions: Subscription[] = [];

  constructor(
    private sidebarState: SidebarStateService
  ) { }

  ngOnInit() {
    // Подписываемся на изменения состояния
    this.subscriptions.push(
      this.sidebarState.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
      })
    );

    this.subscriptions.push(
      this.sidebarState.collapsed$.subscribe(collapsed => {
        this.sidebarCollapsed = collapsed;
      })
    );

    this.subscriptions.push(
      this.sidebarState.mobileOpen$.subscribe(open => {
        this.mobileMenuOpen = open;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
