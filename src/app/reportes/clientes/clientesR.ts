import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
// import { ReportesComponent } from './reportes';

@Component({
  selector: 'app-reportes',
imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './clientesR.html',
  styleUrls: ['./clientesR.scss']
})
export class clientesR {

clienteSeleccionado: string = '';
  clientes = [
    { id: 1, nombre: 'Juan Pérez' },
    { id: 2, nombre: 'María López' },
    { id: 3, nombre: 'Carlos Torres' }
  ];

  prestamos = []; // aquí irían los datos reales
  prestamosFiltrados = [];
  filasMostradas = 10;
  busqueda = '';
  reporte: any;

  buscar() {
    console.log('Buscando préstamos del cliente:', this.clienteSeleccionado);
  }

  exportarExcel() {
    console.log('Exportar a Excel');
  }

  imprimir() {
    console.log('Imprimir reporte');
  }

  verDetalle(prestamo: any) {
    console.log('Ver detalle:', prestamo);
  }
}