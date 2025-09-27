import { Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';

export const routes: Routes = [
  // Redirección por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Rutas públicas
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
        // --- CAMBIO AQUÍ ---
        // Apuntamos al archivo sin ".component"
        loadComponent: () => import('./components/sede-list/sede-list').then(c => c.SedeListComponent)
      },
      {
        path: 'waste-form/:sedeId',
        loadComponent: () => import('./components/waste-form/waste-form').then(c => c.WasteFormComponent)
      },
      {
        path: 'form-success',
        loadComponent: () => import('./components/form-success/form-success').then(c => c.FormSuccess)
      }
    ]
  },
  
  // Ruta wildcard
  { path: '**', redirectTo: '/login' }
];

