import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Imports de Angular Material para el diseño
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

// Interfaz para la información del usuario que esperamos del localStorage
interface UserProfile {
  nombres: string;
  apellidos: string;
  email: string;
  codigo?: string; // El '?' significa que este campo es opcional
  role: {
    nombre: string;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  isLoading: boolean = true;
  userProfile: UserProfile | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Para evitar errores en el servidor, solo accedemos a localStorage en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserProfile();
    } else {
      this.isLoading = false; // En el servidor, simplemente no mostramos nada
    }
  }

  private loadUserProfile(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        this.userProfile = JSON.parse(userStr);
      } catch (error) {
        console.error('Error al leer los datos del perfil de usuario:', error);
        this.userProfile = null;
      }
    }
    this.isLoading = false; // Terminamos de "cargar"
  }
}