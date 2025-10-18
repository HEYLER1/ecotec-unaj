import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Sede } from '../../interfaces/sede';
import { SedeService } from '../../services/sede.service';

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
export class SedeListComponent implements OnInit {
  
  campusList: Sede[] = [];
  isLoading: boolean = true;
  
  constructor(
    private router: Router,
    private sedeService: SedeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadSedes();
  }

  private loadSedes(): void {
    this.sedeService.getSedes().subscribe({
      next: (sedes) => {
        this.campusList = sedes;
        this.isLoading = false;
        console.log('Sedes cargadas:', this.campusList);
      },
      error: (error) => {
        console.error('Error al cargar sedes:', error);
        this.isLoading = false;
      }
    });
  }

  private getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return user.perfil?.nombre || null;
        } catch (error) {
          console.error('Error al parsear datos de usuario del localStorage', error);
          return null;
        }
      }
    }
    return null;
  }

  openSede(id_sede: number) {
    const userRole = this.getUserRole();

    console.log("Rol detectado en localStorage:", userRole);

    if (!userRole) {
      console.error('No se pudo determinar el rol del usuario o es nulo. No se puede navegar.');
      return;
    }

    // Normalizar el rol a minúsculas para comparación case-insensitive
    const userRoleLower = userRole.toLowerCase();

    if (userRoleLower === 'estudiante') {
      console.log('Usuario es ESTUDIANTE. Navegando a form-estudiante...');
      this.router.navigate(['/admin/form-estudiante', id_sede]);

    } else if (userRoleLower === 'personal') {
      console.log('Usuario es PERSONAL. Navegando a form-personal...');
      this.router.navigate(['/admin/form-personal', id_sede]);

    } else if (userRoleLower === 'administrador' || userRoleLower === 'admin') {
      console.log('Usuario es ADMIN. Puede acceder a cualquier formulario. Navegando a form-personal...');
      this.router.navigate(['/admin/form-personal', id_sede]);

    } else {
      console.error(`Rol "${userRole}" no reconocido. No se puede navegar.`);
    }
  }

  trackByCampusId(index: number, campus: Sede): number {
    return campus.id_sede;
  }
}