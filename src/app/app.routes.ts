import { Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';

export const routes: Routes = [
  // Redirección por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Rutas públicas con lazy loading de componentes standalone
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'signIn',
    loadComponent: () => import('./components/sign-in/sign-in.component').then(c => c.SignInComponent)
  },

  // Rutas protegidas del admin
  {
    path: 'admin',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent) // 👈 corregido
      },
    ]
  },
  
  // Ruta wildcard
  { path: '**', redirectTo: '/login' }
];
