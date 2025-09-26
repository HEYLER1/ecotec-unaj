import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { SidebarComponent } from '../sidebar/sidebar'; // Importar el sidebar

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
    MatDividerModule,
    SidebarComponent // Agregar el sidebar a las importaciones
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sidebarVisible = false;
  
  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
    console.log('Toggle sidebar', this.sidebarVisible);
  }

  closeSidebar(): void {
    this.sidebarVisible = false;
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
}