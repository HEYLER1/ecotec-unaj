import { Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { roleGuard } from './utils/role.guard';

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
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      },
      
      // DASHBOARD - Para TODOS (estudiantes y personal)
      {
        path: 'dashboard',
        loadComponent: () => import('./components/sede-list/sede-list').then(c => c.SedeListComponent),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] } // 👈 Ambos roles
      },
      
      // WASTE-FORM - Solo para PERSONAL
      {
        path: 'waste-form/:sedeId',
        loadComponent: () => import('./components/waste-form/waste-form').then(c => c.WasteFormComponent),
        canActivate: [roleGuard],
        data: { roles: ['personal'] } // 👈 Solo personal
      },
      
      
      // FORM-SUCCESS - Para TODOS (después de enviar formulario)
      {
        path: 'form-success',
        loadComponent: () => import('./components/form-personal/form-success').then(c => c.FormSuccess),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] } // 👈 Ambos roles
      }
    ]
  },
  
  // Ruta wildcard
  { path: '**', redirectTo: '/login' }
];