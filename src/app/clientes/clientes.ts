import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

export interface Cliente {
  id: number;
  nombre: string;
  apellido?: string;
  telefono?: string;
  email?: string;
  rfc?: string;
  direccion?: string;
  activo: boolean;
  createdAt: string; // dd/MM/yyyy
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.scss'], // <-- en plural
})
export class Clientes {
  // Para usar Math.min en el template
  Math = Math;

  // Header (buscador, filas, paginación)
  pageSize = 10;
  page = 1;
  query = '';

  // estado modal/form
  showForm = false;
  editingId: number | null = null;

  // Demo data
  clientes: Cliente[] = [
    {
      id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '9991234567',
      email: 'juan@mail.com', rfc: 'JUAP800101XXX', direccion: 'Calle 1 #123',
      activo: true, createdAt: '01/08/2024',
    },
    {
      id: 2, nombre: 'María', apellido: 'López', telefono: '9997654321',
      email: 'maria@mail.com', rfc: 'MALO820202YYY', direccion: 'Calle 2 #456',
      activo: true, createdAt: '10/08/2024',
    },
    {
      id: 3, nombre: 'Carlos', apellido: 'Santos', telefono: '9851102233',
      email: 'carlos@mail.com', rfc: 'CASA900909ZZZ', direccion: 'Centro',
      activo: false, createdAt: '15/08/2024',
    },
  ];

  // ✅ Usa inject + nonNullable para evitar nulls y el error TS2729
  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: [''],
    telefono: ['',[Validators.pattern(/^\d{7,15}$/)]],
    email: ['', [Validators.email]],
    rfc: ['',[Validators.maxLength(13)]],
    direccion: [''],
    activo: true,
  });

  // Filtro + paginado
  get filtered(): Cliente[] {
    const q = this.query.trim().toLowerCase();
    const rows = !q
      ? this.clientes
      : this.clientes.filter(c =>
          (c.nombre + ' ' + (c.apellido ?? '')).toLowerCase().includes(q) ||
          (c.telefono ?? '').includes(q) ||
          (c.email ?? '').toLowerCase().includes(q) ||
          (c.rfc ?? '').toLowerCase().includes(q) ||
          (c.direccion ?? '').toLowerCase().includes(q)
        );
    const start = (this.page - 1) * this.pageSize;
    return rows.slice(start, start + this.pageSize);
  }

  get total(): number {
    return this.clientes.length;
  }

  onNuevo(): void {
    this.editingId = null;
    this.form.reset({
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      rfc: '',
      direccion: '',
      activo: true,
    });
    this.showForm = true;
  }

  onEditar(row: Cliente): void {
    this.editingId = row.id;
    this.form.reset({
      nombre: row.nombre,
      apellido: row.apellido ?? '',
      telefono: row.telefono ?? '',
      email: row.email ?? '',
      rfc: row.rfc ?? '',
      direccion: row.direccion ?? '',
      activo: row.activo,
    });
    this.showForm = true;
  }

  onEliminar(row: Cliente): void {
    if (confirm(`Eliminar cliente: ${row.nombre} ${row.apellido ?? ''}?`)) {
      this.clientes = this.clientes.filter(x => x.id !== row.id);
      const max = Math.max(1, Math.ceil(this.clientes.length / this.pageSize));
      if (this.page > max) this.page = max;
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue(); // todos NO nulos gracias a nonNullable

    if (this.editingId) {
      // 🔒 No hacemos spread directo de v (aunque ya no es null), pero es válido:
      this.clientes = this.clientes.map(c =>
        c.id === this.editingId
          ? { ...c,
              nombre: v.nombre,
              apellido: v.apellido,
              telefono: v.telefono,
              email: v.email,
              rfc: v.rfc,
              direccion: v.direccion,
              activo: v.activo
            }
          : c
      );
    } else {
      const nextId = (this.clientes.at(-1)?.id ?? 0) + 1;
      const nuevo: Cliente = {
        id: nextId,
        nombre: v.nombre,
        apellido: v.apellido,
        telefono: v.telefono,
        email: v.email,
        rfc: v.rfc,
        direccion: v.direccion,
        activo: v.activo,
        createdAt: new Date().toLocaleDateString('es-MX'),
      };
      this.clientes = [...this.clientes, nuevo];
    }
    this.showForm = false;
  }

  cerrarForm(): void {
    this.showForm = false;
  }

  prevPage(): void {
    if (this.page > 1) this.page--;
  }

  nextPage(): void {
    const max = Math.max(1, Math.ceil(this.clientes.length / this.pageSize));
    if (this.page < max) this.page++;
  }
}
