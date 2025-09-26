// login.component.ts
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { ErrorService } from '../../services/error.service';
import { UserService } from '../../services/user.service';
import { ParticlesService } from '../../services/particles.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  // CORREGIDO: Cambiado 'email' por 'username' para coincidir con el HTML
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService,
    private particlesService: ParticlesService
  ) {}

  async ngOnInit() {
    console.log('Iniciando componente login...');
  }

  async ngAfterViewInit() {
    // Esperamos a que el DOM esté listo
    setTimeout(async () => {
      await this.initializeParticles();
    }, 100);
  }

  ngOnDestroy() {
    this.particlesService.destroyParticles();
  }

  private async initializeParticles() {
    try {
      const isSmallScreen = window.innerWidth <= 1024;
      
      // Inicializar el engine de partículas
      await this.particlesService.initializeParticlesEngine();
      
      if (isSmallScreen) {
        // MÓVIL: Polígono centrado donde está el logo (reemplaza la imagen)
        const position = { x: 50, y: 12 }; // Centrado arriba
        const scale = 0.6;
        
        await this.particlesService.loadPolygonParticles(
          'tsparticles-login-bg',
          'icons/unajlogo.svg',
          position,
          scale,
          true // useAbsolutePositioning
        );
      } else {
        // DESKTOP: Polígono al lado derecho del login (imagen permanece)
        const position = { x: 55, y: 30 }; // Lado derecho, centrado verticalmente
        const scale = 1.2;
        
        await this.particlesService.loadPolygonParticles(
          'tsparticles-login-bg',
          'icons/unajlogo.svg',
          position,
          scale,
          true // fullScreen para fondo completo
        );
      }
      
    } catch (error) {
      console.error('Error al inicializar partículas:', error);
    }
  }

  // Manejar redimensionamiento de ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    setTimeout(() => {
      this.initializeParticles();
    }, 100);
  }

  login() {
    // Validación usando la propiedad username del componente
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Mapeamos username a email para cumplir con la interfaz User
    const user: User = {
      email: this.username, // El username se mapea al campo email requerido por la interfaz
      password: this.password
    };

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/admin/dashboard']);
        this.loading = false;
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    });
  }
}