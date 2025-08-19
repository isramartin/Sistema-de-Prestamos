import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apertura',
  templateUrl: './apertura.html',
  styleUrls: ['./apertura.scss'],
  standalone: true, // Si estás usando componentes standalone
  imports: [CommonModule, FormsModule] // Importaciones necesarias
})
export class Apertura implements OnInit {
  registros: any[] = [
    {
      montoInicial: 5000,
      ingreso: 0,
      egreso: 0,
      montoPrestamo: 0,
      fechaApertura: new Date('2024-03-28T17:54:56'),
      fechaCierre: null,
      cantidadPrestamos: 0,
      montoTotal: 5000,
      estado: 'abierto'
    }
  ];

  registrosFiltrados: any[] = [];
  filtros = {
    fechaInicio: '',
    fechaFin: '',
    estado: ''
  };

  mostrarModal = false;
  nuevaApertura = {
    montoInicial: 0,
    observaciones: ''
  };

  // Paginación
  paginaActual = 0;
  registrosPorPagina = 10;
  totalRegistros = 1;

  ngOnInit(): void {
    this.filtrarRegistros();
  }

  filtrarRegistros(): void {
    this.registrosFiltrados = this.registros.filter(registro => {
      const cumpleFechaInicio = !this.filtros.fechaInicio || 
        new Date(registro.fechaApertura) >= new Date(this.filtros.fechaInicio);
      const cumpleFechaFin = !this.filtros.fechaFin || 
        new Date(registro.fechaApertura) <= new Date(this.filtros.fechaFin + 'T23:59:59');
      const cumpleEstado = !this.filtros.estado || 
        registro.estado === this.filtros.estado;
      
      return cumpleFechaInicio && cumpleFechaFin && cumpleEstado;
    });
    
    this.totalRegistros = this.registrosFiltrados.length;
    this.paginaActual = 0;
  }

  abrirModalApertura(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.nuevaApertura = { montoInicial: 0, observaciones: '' };
  }

  guardarApertura(): void {
    const nuevoRegistro = {
      montoInicial: this.nuevaApertura.montoInicial,
      ingreso: 0,
      egreso: 0,
      montoPrestamo: 0,
      fechaApertura: new Date(),
      fechaCierre: null,
      cantidadPrestamos: 0,
      montoTotal: this.nuevaApertura.montoInicial,
      estado: 'abierto',
      observaciones: this.nuevaApertura.observaciones
    };
    
    this.registros.unshift(nuevoRegistro);
    this.filtrarRegistros();
    this.cerrarModal();
  }

  cerrarCaja(registro: any): void {
    registro.fechaCierre = new Date();
    registro.estado = 'cerrado';
    // Aquí iría la lógica para calcular los totales finales
  }

  verDetalle(registro: any): void {
    // Implementar navegación al detalle
    console.log('Ver detalle:', registro);
  }

  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
    }
  }

  paginaSiguiente(): void {
    if ((this.paginaActual + 1) * this.registrosPorPagina < this.totalRegistros) {
      this.paginaActual++;
    }
  }
}