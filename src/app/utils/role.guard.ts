// utils/role.guard.ts
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

    const userPerfil = user.perfil?.nombre;

    if (!userPerfil) {
      console.error('Usuario sin perfil asignado');
      router.navigate(['/login']);
      return false;
    }

    console.log('Perfil del usuario:', userPerfil);

    const allowedRoles = route.data['roles'] as string[];

    console.log('Perfiles permitidos en esta ruta:', allowedRoles);

    // Verificar si el usuario tiene permiso (comparación case-insensitive)
    if (allowedRoles && allowedRoles.length > 0) {
      // Convertir todo a minúsculas para comparar
      const userPerfilLower = userPerfil.toLowerCase();
      const allowedRolesLower = allowedRoles.map(role => role.toLowerCase());

      if (!allowedRolesLower.includes(userPerfilLower)) {
        console.warn(`Acceso denegado. Perfil "${userPerfil}" no está en:`, allowedRoles);

        // Evitar bucle infinito: si ya estamos en dashboard, redirigir a login
        const currentUrl = router.url;
        if (currentUrl.includes('/admin/dashboard')) {
          console.error('Usuario sin permisos para acceder al dashboard');
          router.navigate(['/login']);
        } else {
          // Redirigir a dashboard si no tiene acceso a esta ruta
          router.navigate(['/admin/dashboard']);
        }
        return false;
      }
    }

    console.log('✅ Acceso permitido');
    return true;

  } catch (error) {
    console.error('Error al verificar perfil:', error);
    router.navigate(['/login']);
    return false;
  }
};

/*
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
};*/