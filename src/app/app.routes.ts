import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { NoAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'boards',
    loadComponent: () => import('./features/boards/boards.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'boards/:boardId/lists',
    loadComponent: () => import('./features/board-lists/board-lists.component'),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component'),
    canActivate: [NoAuthGuard],
  },
  {
    path: 'callback',
    loadComponent: () => import('./features/callback/callback.component'),
    canActivate: [NoAuthGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];
