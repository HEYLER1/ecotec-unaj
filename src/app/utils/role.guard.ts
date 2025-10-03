// utils/role.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  
  // Protección SSR
  if (typeof window === 'undefined') {
    return false;
  }

  // Obtener el usuario del localStorage
  const userStr = localStorage.getItem('user');
  
  if (!userStr) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const user = JSON.parse(userStr);
    const userRole = user.role?.nombre; // 👈 Solo usar role.nombre de la BD
    
    if (!userRole) {
      console.error('Usuario sin rol asignado');
      router.navigate(['/login']);
      return false;
    }

    // Obtener los roles permitidos de la ruta
    const allowedRoles = route.data['roles'] as string[];
    
    // Verificar si el usuario tiene permiso
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(userRole)) {
        // Redirigir a dashboard si no tiene acceso a esta ruta
        router.navigate(['/admin/dashboard']); // 👈 Siempre al dashboard
        return false;
      }
    }
    
    return true;
    
  } catch (error) {
    console.error('Error al verificar rol:', error);
    router.navigate(['/login']);
    return false;
  }
};