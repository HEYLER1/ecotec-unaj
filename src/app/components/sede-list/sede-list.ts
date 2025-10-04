import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Sede } from '../../interfaces/sede';

// Imports de Angular Material para las tarjetas
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sede-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sede-list.html',
  styleUrls: ['./sede-list.css']
})
export class SedeListComponent {
  
  campusList: Sede[] = [
    { id: 1, name: 'SEDE CAPILLA - ADMINISTRATIVO', image: 'images/sede.jpg' },
    { id: 2, name: 'SEDE AYABACAS', image: 'images/sede.jpg' },
    { id: 3, name: 'SEDE CAPILLA - ACADÉMICO', image: 'images/sede.jpg' },
    { id: 4, name: 'SEDE SANTA CATALINA', image: 'images/sede.jpg' }
  ];
  
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.role?.nombre || null;
        } catch (error) {
          console.error('Error al parsear datos de usuario del localStorage', error);
          return null;
        }
      }
    }
    return null;
  }

  openSede(sedeId: number) {
    const userRole = this.getUserRole();

    // --- CAMBIO 1: El "espía" para ver el rol exacto en la consola ---
    console.log("Rol detectado en localStorage:", userRole);

    if (userRole === 'estudiante') {
      console.log('Usuario es ESTUDIANTE. Navegando a form-estudiante...');
      this.router.navigate(['/admin/form-estudiante', sedeId]);

    } else if (userRole === 'personal') {
      console.log('Usuario es PERSONAL. Navegando a form-personal...');
      // --- CAMBIO 2: Corregida la ruta para que apunte al nuevo componente ---
      this.router.navigate(['/admin/form-personal', sedeId]);

    } else {
      console.error('No se pudo determinar el rol del usuario o es nulo. No se puede navegar.');
      // Esto es lo que probablemente está pasando.
    }
  }

  trackByCampusId(index: number, campus: Sede): number {
    return campus.id;
  }
}