import { Component } from '@angular/core';
import { AuthRoutingModule } from '../auth/auth-routing-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
  imports: [AuthRoutingModule, CommonModule],
})
export class Layout {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  prestamosOpen = false;

  togglePrestamos() {
    this.prestamosOpen = !this.prestamosOpen;
  }

  childActive = false;

  selectChild() {
    this.childActive = true;
  }
}
