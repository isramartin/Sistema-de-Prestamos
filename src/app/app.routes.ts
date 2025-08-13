import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { HomeComponent } from './home/components/home.component'; // ajusta ruta
import { Prestamo } from './prestamos/prestamos';
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'prestamos',
        component: Prestamo,
        children: [
          {
            path: 'crear',
            loadComponent: () =>
              import('./prestamos/crear/crear').then((m) => m.Crear),
          },
        ],
      },
    ],
  },
];
