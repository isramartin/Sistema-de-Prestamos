import { Pipe, PipeTransform } from '@angular/core';
import { Data } from './moneda';

@Pipe({
  name: 'filtroMoneda',
  standalone: true
})
export class FiltroMonedaPipe implements PipeTransform {
  transform(monedas: Data[], filtro: string): Data[] {
    if (!monedas) return [];
    if (!filtro) return monedas;
    filtro = filtro.toLowerCase();
    return monedas.filter(
      (m) =>
        m.nombre.toLowerCase().includes(filtro) ||
        m.abreviatura.toLowerCase().includes(filtro) ||
        m.simbolo.toLowerCase().includes(filtro) ||
        m.descripcion.toLowerCase().includes(filtro)
    );
  }
}
