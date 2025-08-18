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
  prestamosOpen = false;
  childActive = false;
  activeMainItem: string | null = null; // nuevo

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setActiveMain(item: string) {
    this.activeMainItem = item;
    this.prestamosOpen = false; // cerramos prestamos si se abre otro menú
    this.childActive = false;
  }

  togglePrestamos() {
    // marcar prestamos como activo
    this.activeMainItem = 'prestamos';
    this.childActive = false;
    // abrir/cerrar submenu
    this.prestamosOpen = !this.prestamosOpen;
  }

  selectChild() {
    this.childActive = true;
  }

  cajaOpen: boolean = false;
  toggleCaja(): void {
    this.cajaOpen = !this.cajaOpen;
    if (this.cajaOpen) {
      this.activeMainItem = 'caja';
    }
  }

  mantenimientoOpen: boolean = false;
  toggleMantenimiento(): void {
    this.mantenimientoOpen = !this.mantenimientoOpen;
    if (this.mantenimientoOpen) {
      this.activeMainItem = 'mantenimiento';
    }
  }

  reportesOpen: boolean = false;
  toggleReportes(): void {
    this.reportesOpen = !this.reportesOpen;
    if (this.reportesOpen) {
      this.activeMainItem = 'reportes';
    }
  }
}
