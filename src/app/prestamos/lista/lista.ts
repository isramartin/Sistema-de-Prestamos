import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Estado = 'aprobado' | 'finalizado' | 'anulado' | 'pendiente';
type FPago = 'Semanal' | 'Mensual' | 'Quincenal' | 'Diario';

interface Prestamo {
  nro: string;
  cliente: string;
  monto: number;
  interes: number;
  cuotas: number;
  fpago: FPago;
  usuario: string;
  fecha: string; // dd/MM/yyyy
  estado: Estado;
}

@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.html',
  styleUrls: ['./lista.scss'],
})
export class Lista {
  // Toolbar
  pageSizeOptions = [10, 25, 50, 100];
  pageSize = 10;
  page = 1;
  query = '';

  // Dataset demo (ajusta luego a tu API)
  rows: Prestamo[] = [
    {
      nro: '00000020',
      cliente: 'Marian Antonia Huchin Tamay',
      monto: 5000,
      interes: 44,
      cuotas: 16,
      fpago: 'Semanal',
      usuario: 'gmasias',
      fecha: '07/11/2024',
      estado: 'aprobado',
    },
    {
      nro: '00000019',
      cliente: 'leonardo',
      monto: 4738,
      interes: 0,
      cuotas: 23,
      fpago: 'Semanal',
      usuario: 'gmasias',
      fecha: '28/10/2024',
      estado: 'aprobado',
    },
    {
      nro: '00000018',
      cliente: 'juan caamal',
      monto: 20000,
      interes: 48.8,
      cuotas: 24,
      fpago: 'Semanal',
      usuario: 'gmasias',
      fecha: '28/10/2024',
      estado: 'aprobado',
    },
    {
      nro: '00000017',
      cliente: 'josue',
      monto: 55000,
      interes: 74.5456,
      cuotas: 24,
      fpago: 'Mensual',
      usuario: 'gmasias',
      fecha: '10/07/2024',
      estado: 'aprobado',
    },
    {
      nro: '00000016',
      cliente: 'juan caamal',
      monto: 20000,
      interes: 48.8,
      cuotas: 24,
      fpago: 'Semanal',
      usuario: 'gmasias',
      fecha: '18/06/2024',
      estado: 'finalizado',
    },
    {
      nro: '00000015',
      cliente: 'josue',
      monto: 70000,
      interes: 44,
      cuotas: 24,
      fpago: 'Quincenal',
      usuario: 'gmasias',
      fecha: '08/06/2024',
      estado: 'anulado',
    },
    {
      nro: '00000014',
      cliente: 'Gustavo Masias',
      monto: 1000,
      interes: 44,
      cuotas: 5,
      fpago: 'Diario',
      usuario: 'gmasias',
      fecha: '28/03/2024',
      estado: 'finalizado',
    },
  ];
  Math: any;

  get filtered(): Prestamo[] {
    const q = this.query.trim().toLowerCase();
    const all = !q
      ? this.rows
      : this.rows.filter(
          (r) =>
            r.nro.toLowerCase().includes(q) ||
            r.cliente.toLowerCase().includes(q) ||
            r.usuario.toLowerCase().includes(q) ||
            r.fecha.toLowerCase().includes(q) ||
            r.fpago.toLowerCase().includes(q) ||
            r.estado.toLowerCase().includes(q)
        );
    // paginación
    const start = (this.page - 1) * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  get total(): number {
    const q = this.query.trim().toLowerCase();
    return !q
      ? this.rows.length
      : this.rows.filter(
          (r) =>
            r.nro.toLowerCase().includes(q) ||
            r.cliente.toLowerCase().includes(q) ||
            r.usuario.toLowerCase().includes(q) ||
            r.fecha.toLowerCase().includes(q) ||
            r.fpago.toLowerCase().includes(q) ||
            r.estado.toLowerCase().includes(q)
        ).length;
  }

  setPageSize(n: number) {
    this.pageSize = n;
    this.page = 1;
  }

  prev() {
    if (this.page > 1) this.page--;
  }
  next() {
    const max = Math.max(1, Math.ceil(this.total / this.pageSize));
    if (this.page < max) this.page++;
  }

  // Acciones
  exportCSV() {
    const header = [
      'Nro Prestamo',
      'Cliente',
      'Monto',
      'Interes',
      'Cuotas',
      'F. Pago',
      'Usuario',
      'Fecha',
      'Estado',
    ];
    const data = this.rows.map((r) => [
      r.nro,
      r.cliente,
      r.monto,
      r.interes,
      r.cuotas,
      r.fpago,
      r.usuario,
      r.fecha,
      r.estado,
    ]);
    const csv = [header, ...data].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prestamos.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  print() {
    window.print();
  }

  ver(r: Prestamo) {
    alert(`Ver préstamo ${r.nro}`);
  }
  aprobar(r: Prestamo) {
    alert(`Aprobar préstamo ${r.nro}`);
  }
  pagar(r: Prestamo) {
    alert(`Registrar pago de ${r.nro}`);
  }
  editar(r: Prestamo) {
    alert(`Editar préstamo ${r.nro}`);
  }
  eliminar(r: Prestamo) {
    if (confirm(`Eliminar ${r.nro}?`))
      this.rows = this.rows.filter((x) => x !== r);
  }
  correo(r: Prestamo) {
    alert(`Enviar correo de ${r.nro}`);
  }
}
