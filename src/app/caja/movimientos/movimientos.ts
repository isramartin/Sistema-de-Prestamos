import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthRoutingModule } from '../../auth/auth-routing-module';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Movimiento {
  tipo: 'INGRESO' | 'EGRESO';
  descripcion: string;
  monto: number;
  fecha: string; // 'dd/MM/yyyy'
  estado: 'VIGENTE' | 'CERRADO';
}
@Component({
  selector: 'app-movimientos',
  imports: [AuthRoutingModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.scss',
})
export class Movimientos {
  currentSubmenu: string = 'movimientos'; // Valor por defecto
  pageSize = 10;
  page = 1;
  query = '';

  data: Movimiento[] = [
    {
      tipo: 'INGRESO',
      descripcion: 'ghufttfgby',
      monto: 20000000,
      fecha: '18/06/2024',
      estado: 'VIGENTE',
    },
    {
      tipo: 'INGRESO',
      descripcion: '32rrqwe',
      monto: 100000,
      fecha: '08/06/2024',
      estado: 'VIGENTE',
    },
    {
      tipo: 'INGRESO',
      descripcion: 'prestamo',
      monto: 80000,
      fecha: '08/06/2024',
      estado: 'VIGENTE',
    },
  ];
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

  // Filtro + paginado simple
  get filtered(): Movimiento[] {
    const q = this.query.trim().toLowerCase();
    const rows = !q
      ? this.data
      : this.data.filter(
          (r) =>
            r.tipo.toLowerCase().includes(q) ||
            r.descripcion.toLowerCase().includes(q) ||
            String(r.monto).includes(q) ||
            r.fecha.includes(q) ||
            r.estado.toLowerCase().includes(q)
        );
    const start = (this.page - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  }

  get total(): number {
    // si quieres que el “Mostrando … total de …” respete el filtro,
    // cámbialo por filtered.length sin el slice.
    return this.data.length;
  }

  // Acciones UI
  onNuevo(): void {
    console.log('Nuevo movimiento');
    // abre modal o navega a formulario
  }

  onEditar(row: Movimiento, index?: number): void {
    console.log('Editar', index, row);
  }

  onEliminar(row: Movimiento, index?: number): void {
    console.log('Eliminar', index, row);
    // this.data.splice(index!, 1); // ejemplo si quieres eliminar por índice
  }

  prevPage(): void {
    if (this.page > 1) this.page--;
  }

  nextPage(): void {
    const max = Math.max(1, Math.ceil(this.data.length / this.pageSize));
    if (this.page < max) this.page++;
  }
}
