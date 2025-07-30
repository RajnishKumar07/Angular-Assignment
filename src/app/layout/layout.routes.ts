import { Routes } from '@angular/router';
import { Layout } from './layout';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../features/profile/profile').then((c) => c.Profile),
      },
    ],
  },
];
