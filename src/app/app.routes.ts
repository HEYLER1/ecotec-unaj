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
        data: { roles: ['estudiante', 'personal'] }
      },

      // FORM-ESTUDIANTE - Solo para ESTUDIANTES
      {
        path: 'form-estudiante/:sedeId',
        loadComponent: () => import('./components/forms-student/forms-student').then(c => c.FormEstudianteComponent),
        canActivate: [roleGuard],
        data: { roles: ['estudiante'] } 
      },
      
      // La ruta para el personal ahora apunta al nuevo componente 'form-personal'
      {
        path: 'form-personal/:sedeId',
        loadComponent: () => import('./components/form-personal/form-personal').then(c => c.FormPersonal),
        canActivate: [roleGuard],
        data: { roles: ['personal'] }
      },

      // RECIENTES - Para TODOS (estudiantes y personal)
      {
        path: 'recientes',
        loadComponent: () => import('./components/recent-entries/recent-entries').then(c => c.RecentEntriesComponent),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] }
      },

      // --- NUEVA RUTA AÑADIDA ---
      // PERFIL - Para TODOS (estudiantes y personal)
      {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile').then(c => c.Profile),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] }
      },
      
      // FORM-SUCCESS - Para TODOS (después de enviar formulario)
      {
        path: 'form-success',
        loadComponent: () => import('./components/form-success/form-success').then(c => c.FormSuccess),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] }
      }
    ]
  },
  
  // Ruta wildcard
  { path: '**', redirectTo: '/login' }
];