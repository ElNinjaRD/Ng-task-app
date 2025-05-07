import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    canActivate: [publicGuard()],
    path:'auth',
    loadChildren: () => import('./auth/features/auth.routes')
  },
  {
    canActivate: [privateGuard()],
    path:'task',
    loadComponent: () => import('./shared/UI/layout/layout.component'),
    loadChildren: () => import('./task/features/task.routes')
  }
];
