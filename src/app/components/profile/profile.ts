import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { UserInfoService } from '../../services/UserInfo.service';
import { UserProfile, UserProfileResponse } from '../../interfaces/UserInfo'; // ✅ Importar ambos
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userInfoService: UserInfoService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserProfile();
    } else {
      this.isLoading = false;
    }
  }

  private loadUserProfile(): void {
    this.userInfoService.getUserProfile().subscribe({
      next: (response: UserProfileResponse) => {
        this.userProfile = response.data;
        console.log(' Perfil del usuario cargado:', this.userProfile);
        this.isLoading = false;
      },
      error: (error) => {
        console.error(' Error al cargar perfil:', error);
        this.toastr.error('No se pudo cargar el perfil', 'Error');
        this.isLoading = false;
        
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  get fullName(): string {
    if (!this.userProfile) return '';
    return `${this.userProfile.nombre} ${this.userProfile.apellido}`;
  }

  get roleName(): string {
    return this.userProfile?.perfil?.nombre || 'Sin perfil';
  }

  get phoneNumber(): string {
    return this.userProfile?.telefono || 'No registrado';
  }
}