import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ClientesModal, ClienteRow } from './modal/clientes-modal';

type Periodicidad = 'mensual' | 'quincenal' | 'semanal';
type MetodoPago = 'efectivo' | 'transferencia' | 'caja';

interface Cuota {
  numero: number;
  fecha: string;
  monto: number;
}

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientesModal,
    NgFor,
    NgIf,
  ],
  templateUrl: './solicitud.html',
  styleUrls: ['./solicitud.scss'],
})
export class Solicitud {
  private fb = inject(FormBuilder);
  Math = Math;

  mostrarModalClientes = false;
  clientesModal: ClienteRow[] = [
    {
      id: 10,
      nombres: 'Marian Antonia Huchin Tamay',
      dni: '0008',
      conPrestamo: true,
    },
    { id: 9, nombres: 'leonardo', dni: '0025', conPrestamo: true },
    { id: 8, nombres: 'juan caamal', dni: '09', conPrestamo: true },
    { id: 7, nombres: 'josue', dni: '06', conPrestamo: true },
    { id: 6, nombres: 'isra', dni: '01', conPrestamo: false },
    { id: 1, nombres: 'Gustavo Masias', dni: '71993865', conPrestamo: false },
  ];

  buscarCliente() {
    this.mostrarModalClientes = true;
  }

  onPickCliente(c: ClienteRow) {
    this.form.patchValue({
      nombreCliente: c.nombres,
      identificacion: c.dni,
    });
    this.mostrarModalClientes = false;
  }

  periodicidades: {
    label: string;
    value: Periodicidad;
    factorAnual: number;
  }[] = [
    { label: 'Mensual', value: 'mensual', factorAnual: 12 },
    { label: 'Quincenal', value: 'quincenal', factorAnual: 24 },
    { label: 'Semanal', value: 'semanal', factorAnual: 52 },
  ];
  metodosPago: { label: string; value: MetodoPago }[] = [
    { label: 'Efectivo', value: 'efectivo' },
    { label: 'Transferencia', value: 'transferencia' },
    { label: 'Caja', value: 'caja' },
  ];

  form = this.fb.nonNullable.group({
    nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
    identificacion: [''],

    monto: [0, [Validators.required, Validators.min(100)]],
    tasaAnual: [
      30,
      [Validators.required, Validators.min(0), Validators.max(200)],
    ],
    plazo: [12, [Validators.required, Validators.min(1)]],
    periodicidad: ['mensual' as Periodicidad, [Validators.required]],
    metodoPago: ['caja' as MetodoPago, [Validators.required]],
    fechaDesembolso: [
      new Date().toISOString().slice(0, 10),
      [Validators.required],
    ],

    ingresosMensuales: [0, [Validators.min(0)]],
    egresosMensuales: [0, [Validators.min(0)]],

    destino: [''],
    comentarios: [''],
  });

  cuotaEstim = 0;
  capacidadPago = 0;
  tasaPeriodica = 0;

  montoPorCuota = 0;
  totalInteres = 0;
  totalPagar = 0;
  cuotas: Cuota[] = [];

  constructor() {
    this.form.valueChanges.subscribe(() => this.recalcular());
    this.recalcular();
  }

  private getFactorAnual(periodicidad: Periodicidad): number {
    return this.periodicidades.find((p) => p.value === periodicidad)!
      .factorAnual;
  }

  private amortizacion(P: number, r: number, n: number): number {
    if (r <= 0) return n > 0 ? P / n : 0;
    const denom = 1 - Math.pow(1 + r, -n);
    return denom <= 0 ? 0 : (P * r) / denom;
  }

  private recalcular(): void {
    const v = this.form.getRawValue();
    const P = Number(v.monto) || 0;
    const tasaAnual = Number(v.tasaAnual) || 0;
    const n = Number(v.plazo) || 0;
    const per: Periodicidad = v.periodicidad ?? 'mensual';

    const factor = this.getFactorAnual(per);
    this.tasaPeriodica = tasaAnual / 100 / factor;
    this.cuotaEstim = this.amortizacion(P, this.tasaPeriodica, n);

    const ingresos = Number(v.ingresosMensuales) || 0;
    const egresos = Number(v.egresosMensuales) || 0;
    this.capacidadPago = ingresos - egresos;
  }

  // buscarCliente(): void {
  //   alert('Buscar cliente (demo)');
  // }

  calcular(): void {
    const v = this.form.getRawValue();
    const P = Number(v.monto) || 0;
    const n = Number(v.plazo) || 0;

    this.montoPorCuota = this.cuotaEstim;
    this.totalPagar = this.cuotaEstim * n;
    this.totalInteres = Math.max(0, this.totalPagar - P);

    this.cuotas = this.generarCuotas(
      n,
      this.montoPorCuota,
      v.fechaDesembolso,
      v.periodicidad
    );
  }

  private generarCuotas(
    n: number,
    monto: number,
    fechaISO: string,
    per: Periodicidad
  ): Cuota[] {
    if (!n || n <= 0) return [];
    const base = new Date(fechaISO);
    const add = (d: Date, i: number) => {
      const dt = new Date(d);
      if (per === 'mensual') dt.setMonth(dt.getMonth() + i);
      else if (per === 'quincenal') dt.setDate(dt.getDate() + 14 * i);
      else dt.setDate(dt.getDate() + 7 * i);
      return dt;
    };
    const fmt = (d: Date) =>
      `${String(d.getDate()).padStart(2, '0')}/${String(
        d.getMonth() + 1
      ).padStart(2, '0')}/${d.getFullYear()}`;

    const out: Cuota[] = [];
    for (let i = 1; i <= n; i++)
      out.push({ numero: i, fecha: fmt(add(base, i)), monto });
    return out;
  }

  limpiar(): void {
    this.form.reset({
      nombreCliente: '',
      identificacion: '',
      monto: 0,
      tasaAnual: 30,
      plazo: 12,
      periodicidad: 'mensual',
      metodoPago: 'caja',
      fechaDesembolso: new Date().toISOString().slice(0, 10),
      ingresosMensuales: 0,
      egresosMensuales: 0,
      destino: '',
      comentarios: '',
    });
    this.montoPorCuota = this.totalInteres = this.totalPagar = 0;
    this.cuotas = [];
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      ...this.form.getRawValue(),
      cuotaEstim: this.cuotaEstim,
      tasaPeriodica: this.tasaPeriodica,
      capacidadPago: this.capacidadPago,
      totalInteres: this.totalInteres,
      totalPagar: this.totalPagar,
      createdAt: new Date().toISOString(),
    };
    console.log('Solicitud enviada:', payload);
    alert('Solicitud guardada (demo). Revisa consola.');
    this.limpiar();
  }
}
