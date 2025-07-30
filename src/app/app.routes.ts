import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.routes').then((r) => r.layoutRoutes),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((c) => c.Login),
  },
];
