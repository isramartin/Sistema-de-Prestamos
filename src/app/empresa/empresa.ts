import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa.html',
  styleUrls: ['./empresa.scss'],
})
export class Empresa {
  private fb = inject(FormBuilder);

  monedas = ['S/', '$', '€', 'Bs.', '₡', 'COP $'];

  form = this.fb.nonNullable.group({
    razonSocial: [
      'Sistema de Prestamos  dd',
      [Validators.required, Validators.minLength(3)],
    ],
    ruc: [
      '1020304050',
      [Validators.required, Validators.pattern(/^\d{8,14}$/)],
    ],
    direccion: ['Pita - piura', [Validators.required, Validators.minLength(3)]],
    moneda: ['S/', [Validators.required]],
    correlativo: [
      '00000020',
      [Validators.required, Validators.pattern(/^\d{1,12}$/)],
    ],
    correo: [
      'gmasiasdeveloper@gmail.com',
      [Validators.required, Validators.email],
    ],
  });

  get f() {
    return this.form.controls;
  }

  /** Asegura correlativo de 8 dígitos con ceros a la izquierda */
  padCorrelativo(): void {
    const v = (this.f.correlativo.value || '').toString().replace(/\D/g, '');
    this.f.correlativo.setValue(v.padStart(8, '0'));
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Normaliza correlativo
    this.padCorrelativo();

    const payload = {
      ...this.form.getRawValue(),
      updatedAt: new Date().toISOString(),
    };
    console.log('Configuración guardada:', payload);
    alert('Configuración guardada (demo). Revisa la consola.');
  }
}
