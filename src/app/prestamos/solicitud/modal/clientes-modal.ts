import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ClienteRow {
  id: number;
  nombres: string;
  dni: string;
  conPrestamo: boolean; // true = "CON PRESTAMO", false = "DISPONIBLE"
}

@Component({
  selector: 'clientes-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './clientes-modal.html',
  styleUrl: './clientes-modal.scss',
})
export class ClientesModal {
  [x: string]: any;
  protected readonly Math = Math;

  @Input() open = false;
  @Input() clientes: ClienteRow[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<ClienteRow>();

  pageSize = 10;
  page = 1;
  query = '';

  get total(): number {
    return this.filteredRows.length;
  }

  get filteredRows(): ClienteRow[] {
    const q = this.query.trim().toLowerCase();
    if (!q) return this.clientes;
    return this.clientes.filter(
      (c) =>
        c.nombres.toLowerCase().includes(q) ||
        c.dni.toLowerCase().includes(q) ||
        String(c.id).includes(q)
    );
  }

  get paged(): ClienteRow[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredRows.slice(start, start + this.pageSize);
  }

  setPage(p: number) {
    const max = Math.max(1, Math.ceil(this.total / this.pageSize));
    this.page = Math.min(Math.max(p, 1), max);
  }

  onChangePageSize() {
    this.page = 1;
  }

  pick(c: ClienteRow) {
    this.select.emit(c);
  }
}
