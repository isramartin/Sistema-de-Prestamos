import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroMonedaPipe } from './filtro-moneda.pipe';

export interface Data {
  nombre: string;
  abreviatura: string;
  simbolo: string;
  descripcion: string;
}

@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroMonedaPipe],
  templateUrl: './moneda.html',
  styleUrls: ['./moneda.scss'],
})
export class Moneda {
  monedas: Data[] = [
    {
      nombre: 'Pesos',
      abreviatura: 'MXN',
      simbolo: '$',
      descripcion: 'Peso Mexicano',
    },
  ];

  filtro: string = '';
  mostrarModal: boolean = false;
  modalModo: 'nuevo' | 'editar' = 'nuevo';
  monedaSeleccionada: Data = this.nuevaMoneda();

  nuevaMoneda(): Data {
    return { nombre: '', abreviatura: '', simbolo: '', descripcion: '' };
  }

  abrirModal(modo: 'nuevo' | 'editar', moneda?: Data) {
    this.modalModo = modo;
    this.monedaSeleccionada =
      modo === 'editar' && moneda ? { ...moneda } : this.nuevaMoneda();
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarMoneda() {
    if (this.modalModo === 'nuevo') {
      this.monedas.push({ ...this.monedaSeleccionada });
    } else {
      const index = this.monedas.findIndex(
        (m) => m.nombre === this.monedaSeleccionada.nombre
      );
      if (index !== -1) this.monedas[index] = { ...this.monedaSeleccionada };
    }
    this.cerrarModal();
  }

  eliminar(moneda: Data) {
    if (confirm(`¿Eliminar ${moneda.nombre}?`)) {
      this.monedas = this.monedas.filter((m) => m !== moneda);
    }
  }

  rowsPerPage: number = 10; // linked to el <select>
  currentPage: number = 1; // página actual (para el input)

  // Si quieres mostrar la lista paginada, puedes usar este getter desde la plantilla en vez de 'monedas'
  // Ejemplo de uso en template: *ngFor="let moneda of pagedMonedas | filtroMoneda:filtro"
  get pagedMonedas(): Data[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.monedas.slice(start, start + this.rowsPerPage);
  }

  // Métodos para los botones anterior/siguiente
  prev(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  next(): void {
    const totalPages = Math.max(
      1,
      Math.ceil(this.monedas.length / this.rowsPerPage)
    );
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
}
