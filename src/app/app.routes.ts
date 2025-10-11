// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { roleGuard } from './utils/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'signIn',
    loadComponent: () => import('./components/sign-in/sign-in.component').then(c => c.SignInComponent)
  },

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
      
      {
        path: 'dashboard',
        loadComponent: () => import('./components/sede-list/sede-list').then(c => c.SedeListComponent),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] }
      },

      // ✅ Desactiva prerendering para rutas con parámetros
      {
        path: 'form-estudiante/:sedeId',
        loadComponent: () => import('./components/forms-student/forms-student').then(c => c.FormEstudianteComponent),
        canActivate: [roleGuard],
        data: { 
          roles: ['estudiante'],
          prerender: false  
        }
      },
      
      {
        path: 'form-personal/:sedeId',
        loadComponent: () => import('./components/form-personal/form-personal').then(c => c.FormPersonal),
        canActivate: [roleGuard],
        data: { 
          roles: ['personal'],
          prerender: false  
        }
      },

      {
        path: 'recientes',
        loadComponent: () => import('./components/recent-entries/recent-entries').then(c => c.RecentEntriesComponent),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] }
      },

      {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile').then(c => c.Profile),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] }
      },
      
      {
        path: 'form-success',
        loadComponent: () => import('./components/form-success/form-success').then(c => c.FormSuccess),
        canActivate: [roleGuard],
        data: { roles: ['estudiante', 'personal'] }
      }
    ]
  },
  
  { path: '**', redirectTo: '/login' }
];