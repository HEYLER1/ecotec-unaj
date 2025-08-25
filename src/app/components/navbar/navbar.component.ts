import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userInitial = 'JD'; // Puedes obtener esto del servicio de usuario
  userName = 'Juan Doe'; // Puedes obtener esto del servicio de usuario

  constructor(private router: Router) {}

  logOut() {
    // Elimina el token del localStorage o sessionStorage
    localStorage.removeItem('token');
    
    // Redirige al login
    this.router.navigate(['/login']);
  }

  goToProfile() {
    // Navegar al perfil del usuario
    this.router.navigate(['/profile']);
  }

  goToSettings() {
    // Navegar a configuraciones
    this.router.navigate(['/settings']);
  }
}