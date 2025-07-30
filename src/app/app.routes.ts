import { Routes } from '@angular/router';
import { authGuard } from './core/guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/layout.routes').then((r) => r.layoutRoutes),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((c) => c.Login),
  },
];
