import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Perfil {
  id: number;
  descripcion: string;
  estado: 'Activo' | 'Inactivo';
  usuario: string;
  opciones?: string[]; // permisos asignados
}

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.html',
  styleUrls: ['./configuracion.scss'],
   encapsulation: ViewEncapsulation.None
})
export class Configuracion {

  // Datos de ejemplo
  perfiles: Perfil[] = [
    { id: 1, descripcion: 'Administrador', estado: 'Activo', usuario: 'admin', opciones: ['Dashboard','Usuarios','Reportes'] },
    { id: 2, descripcion: 'Vendedor', estado: 'Activo', usuario: 'vendedor1', opciones: ['Ventas','Productos'] },
    { id: 3, descripcion: 'Invitado', estado: 'Inactivo', usuario: 'guest', opciones: [] }
  ];

  // Controles de paginación/búsqueda (simples)
  verCantidad = 10;
  busqueda = '';

  // Modal Crear / Editar usuario
  showModal = false;
  editando = false;
  usuarioForm = {
    id: 0,
    descripcion: '',
    usuario: '',
    contrasenia: '',
    estado: 'Activo' as 'Activo' | 'Inactivo',
    opciones: [] as string[]
  };

  // Modal Asignar permisos
  showPermisosModal = false;
  perfilSeleccionado: Perfil | null = null;
  opcionesSistema = ['Dashboard', 'Usuarios', 'Productos', 'Ventas', 'Reportes', 'Configuración', 'Clientes'];
  opcionesSeleccionadas: string[] = [];

  // Mensajes / UI helpers
  alertMessage = '';

  /* ------------------ CRUD perfiles (frontend only) ------------------ */
  abrirNuevo() {
    this.editando = false;
    this.usuarioForm = { id: 0, descripcion: '', usuario: '', contrasenia: '', estado: 'Activo', opciones: [] };
    this.showModal = true;
  }

  abrirEditar(perfil: Perfil) {
    this.editando = true;
    this.usuarioForm = {
      id: perfil.id,
      descripcion: perfil.descripcion,
      usuario: perfil.usuario,
      contrasenia: '', // vacío por seguridad; si el usuario escribe algo se actualizará
      estado: perfil.estado,
      opciones: perfil.opciones ? [...perfil.opciones] : []
    };
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
    this.usuarioForm.contrasenia = '';
  }

  guardarUsuario() {
    const form = this.usuarioForm;
    if (!form.descripcion.trim() || !form.usuario.trim()) {
      this.showAlert('Completa nombre de perfil y usuario.');
      return;
    }

    if (this.editando) {
      const idx = this.perfiles.findIndex(p => p.id === form.id);
      if (idx !== -1) {
        this.perfiles[idx].descripcion = form.descripcion;
        this.perfiles[idx].usuario = form.usuario;
        this.perfiles[idx].estado = form.estado;
        // si contraseña tiene valor, simulamos que se actualiza (frontend)
        if (form.contrasenia.trim()) {
          // en un backend real, enviarías la contraseña hasheada
          this.showAlert('Contraseña actualizada (simulado)');
        }
        this.perfiles[idx].opciones = [...form.opciones];
      }
      this.showAlert('Perfil actualizado correctamente.');
    } else {
      const nuevo: Perfil = {
        id: this.perfiles.length ? Math.max(...this.perfiles.map(p=>p.id)) + 1 : 1,
        descripcion: form.descripcion,
        usuario: form.usuario,
        estado: form.estado,
        opciones: [...form.opciones]
      };
      this.perfiles.push(nuevo);
      this.showAlert('Perfil creado correctamente.');
    }

    this.cerrarModal();
  }

  eliminarPerfil(id: number) {
    if (!confirm('¿Deseas eliminar este perfil?')) return;
    this.perfiles = this.perfiles.filter(p => p.id !== id);
    this.showAlert('Perfil eliminado.');
  }

  /* ------------------ Asignar permisos ------------------ */
  abrirAsignarMenu(perfil: Perfil) {
    this.perfilSeleccionado = perfil;
    this.opcionesSeleccionadas = perfil.opciones ? [...perfil.opciones] : [];
    this.showPermisosModal = true;
  }

  cerrarAsignarMenu() {
    this.showPermisosModal = false;
    this.perfilSeleccionado = null;
    this.opcionesSeleccionadas = [];
  }

  toggleOpcion(op: string) {
    if (this.opcionesSeleccionadas.includes(op)) {
      this.opcionesSeleccionadas = this.opcionesSeleccionadas.filter(o => o !== op);
    } else {
      this.opcionesSeleccionadas.push(op);
    }
  }

  guardarAsignacion() {
    if (!this.perfilSeleccionado) return;
    this.perfilSeleccionado.opciones = [...this.opcionesSeleccionadas];
    this.showAlert(`Permisos actualizados para ${this.perfilSeleccionado.descripcion}`);
    this.cerrarAsignarMenu();
  }

  /* ------------------ Helpers UI ------------------ */
  showAlert(msg: string) {
    this.alertMessage = msg;
    setTimeout(()=> this.alertMessage = '', 3000);
  }

  filtrarPerfiles() {
    const q = this.busqueda.trim().toLowerCase();
    if (!q) return this.perfiles;
    return this.perfiles.filter(p =>
      p.descripcion.toLowerCase().includes(q) ||
      (p.usuario && p.usuario.toLowerCase().includes(q))
    );
  }
}