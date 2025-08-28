import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { HomeComponent } from './home/components/home.component'; // ajusta ruta
import { Solicitud } from './prestamos/solicitud/solicitud';
import { Lista } from './prestamos/lista/lista';
import { Movimientos } from './caja/movimientos/movimientos';
import { Apertura } from './caja/apertura/apertura';
import { Clientes } from './clientes/clientes';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: HomeComponent },

      {
        path: 'caja',
        // component: Caja,
        children: [
          { path: 'apertura', component: Apertura },
          { path: 'movimientos', component: Movimientos },
        ],
      },

      { path: 'clientes', component: Clientes },

      {
        path: 'prestamos',
        children: [
          { path: 'solicitud', component: Solicitud },
          { path: 'listado', component: Lista },
          //   { path: 'aprobar', component: AprobarPrestamosComponent },
        ],
      },
    ],
  },
];
