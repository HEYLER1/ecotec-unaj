// src/app/components/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar';
import { UserInfoService } from '../../services/UserInfo.service';
import { NavbarUserInfo } from '../../interfaces/NavbarUserInfo';

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
    SidebarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  sidebarVisible = false;
  userInfo: NavbarUserInfo | null = null;
  isLoadingProfile = true;
  private subscription?: Subscription;
  
  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserProfile();
    } else {
      this.isLoadingProfile = false;
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadUserProfile(): void {
    this.subscription = this.userInfoService.getUserProfile().subscribe({
      next: (response) => {
        // ✅ Asignar solo los campos necesarios
        this.userInfo = {
          email: response.data.email,
          nombre: response.data.nombre,
          apellido: response.data.apellido
        };
        
        console.log('✅ Info del usuario en navbar:', this.userInfo);
        this.isLoadingProfile = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar perfil en navbar:', error);
        this.isLoadingProfile = false;
        
        if (error.status === 401) {
          this.logout();
        }
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;

    if (isPlatformBrowser(this.platformId)) {
      if (this.sidebarVisible) {
        document.body.classList.add('sidebar-open');
      } else {
        document.body.classList.remove('sidebar-open');
      }
    }
  }

  closeSidebar(): void {
    this.sidebarVisible = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('sidebar-open');
    }
  }

  viewProfile(): void {
    this.closeSidebar();
    this.router.navigate(['/admin/profile']);
  }

  logout(): void {
    console.log('🚪 Cerrando sesión...');
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    this.closeSidebar();
    this.router.navigate(['/login']);
  }

  // ✅ Getters simples
  get fullName(): string {
    if (!this.userInfo) return '';
    return `${this.userInfo.nombre} ${this.userInfo.apellido}`;
  }

  get userEmail(): string {
    return this.userInfo?.email || '';
  }

  get initials(): string {
    if (!this.userInfo) return '?';
    const firstName = this.userInfo.nombre.charAt(0);
    const lastName = this.userInfo.apellido.charAt(0);
    return `${firstName}${lastName}`.toUpperCase();
  }
}