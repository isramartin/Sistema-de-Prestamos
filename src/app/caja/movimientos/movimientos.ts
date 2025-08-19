import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthRoutingModule } from '../../auth/auth-routing-module';

@Component({
  selector: 'app-movimientos',
  imports: [AuthRoutingModule],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.scss',
})
export class Movimientos {
  currentSubmenu: string = 'movimientos'; // Valor por defecto

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Detecta la ruta activa para resaltar el submenú correspondiente
    this.route.url.subscribe((url) => {
      const path = url[0]?.path;
      if (path === 'cierre') {
        this.currentSubmenu = 'cierre';
      } else if (path === 'historial') {
        this.currentSubmenu = 'historial';
      } else {
        this.currentSubmenu = 'movimientos';
      }
    });
  }

  // Método para cambiar el submenú activo
  setActiveSubmenu(submenu: string): void {
    this.currentSubmenu = submenu;
  }
}
