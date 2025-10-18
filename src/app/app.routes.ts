import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { HomeComponent } from './home/components/home.component'; // ajusta ruta
import { Solicitud } from './prestamos/solicitud/solicitud';
import { Lista } from './prestamos/lista/lista';
import { Aprobar } from './prestamos/aprobar/aprobar';
import { Movimientos } from './caja/movimientos/movimientos';
import { Apertura } from './caja/apertura/apertura';
import { Clientes } from './clientes/clientes';
import { Empresa } from './empresa/empresa';
import { Moneda } from './moneda/moneda';
import { Usuarios } from './mantenimiento/usuarios/usuarios';
import { Roles } from './mantenimiento/roles/roles';
import { Configuracion } from './mantenimiento/configuracion/configuracion';
import { clientesR } from './reportes/clientes/clientesR';

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
          { path: 'aprobar', component: Aprobar },
        ],
      },

      { path: 'empresa', component: Empresa },

      { path: 'moneda', component: Moneda },

      {
        path: 'mantenimiento',
        // component: Caja,
        children: [
          { path: 'usuarios', component: Usuarios },
          { path: 'roles', component: Roles },
          { path: 'configuracion', component: Configuracion },
        ],
      },

      {
        path: 'reportes',
        // component: Caja,
        children: [
          { path: 'clientes', component: clientesR },
          { path: 'roles', component: Roles },
          { path: 'configuracion', component: Configuracion },
        ],
      },
    ],
  },
];
