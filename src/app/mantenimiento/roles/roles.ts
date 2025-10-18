import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 Aquí está la clave
  templateUrl: './roles.html',
  styleUrls: ['./roles.scss'],
})
export class Roles {
  perfiles = [
    { id: 1, descripcion: 'Administrador', estado: 'Activo' },
    { id: 2, descripcion: 'Vendedor', estado: 'Activo' },
    { id: 3, descripcion: 'Invitado', estado: 'Inactivo' },
  ];

  showModal = false;
  nuevoPerfil = '';
  editando = false;
  perfilEditandoId: number | null = null;

  // --- Asignar Menú ---
  showAsignarMenu = false;
  perfilSeleccionado: any = null;
  opcionesMenu = [
    'Dashboard',
    'Usuarios',
    'Productos',
    'Reportes',
    'Configuración',
    'Ventas',
    'Clientes',
  ];
  opcionesSeleccionadas: string[] = [];

  abrirModal() {
    this.showModal = true;
    this.nuevoPerfil = '';
    this.editando = false;
  }

  cerrarModal() {
    this.showModal = false;
    this.nuevoPerfil = '';
    this.editando = false;
  }

  registrarPerfil() {
    if (this.nuevoPerfil.trim()) {
      const nuevo = {
        id: this.perfiles.length + 1,
        descripcion: this.nuevoPerfil,
        estado: 'Activo',
      };
      this.perfiles.push(nuevo);
      this.cerrarModal();
    }
  }

  eliminarPerfil(id: number) {
    this.perfiles = this.perfiles.filter((p) => p.id !== id);
  }

  editarPerfil(perfil: any) {
    this.showModal = true;
    this.editando = true;
    this.nuevoPerfil = perfil.descripcion;
    this.perfilEditandoId = perfil.id;
  }

  guardarEdicion() {
    if (this.perfilEditandoId !== null && this.nuevoPerfil.trim()) {
      const index = this.perfiles.findIndex(
        (p) => p.id === this.perfilEditandoId
      );
      if (index !== -1) {
        this.perfiles[index].descripcion = this.nuevoPerfil;
      }
      this.cerrarModal();
    }
  }

  // --- Modal de Asignación de Menú ---
  abrirAsignarMenu(perfil: any) {
    this.perfilSeleccionado = perfil;
    this.showAsignarMenu = true;

    // Simular que ya tiene algunas opciones asignadas
    this.opcionesSeleccionadas = perfil.opciones || [];
  }

  cerrarAsignarMenu() {
    this.showAsignarMenu = false;
    this.perfilSeleccionado = null;
  }

  toggleOpcion(opcion: string) {
    if (this.opcionesSeleccionadas.includes(opcion)) {
      this.opcionesSeleccionadas = this.opcionesSeleccionadas.filter(
        (o) => o !== opcion
      );
    } else {
      this.opcionesSeleccionadas.push(opcion);
    }
  }

  guardarAsignacion() {
    if (this.perfilSeleccionado) {
      this.perfilSeleccionado.opciones = [...this.opcionesSeleccionadas];
      alert(
        `Opciones asignadas a ${
          this.perfilSeleccionado.descripcion
        }: ${this.opcionesSeleccionadas.join(', ')}`
      );
    }
    this.cerrarAsignarMenu();
  }
}
