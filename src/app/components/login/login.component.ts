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


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  loginMessage: string | null = null;
  isError: boolean = false;


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
      
      await this.particlesService.initializeParticlesEngine();
      
      if (isSmallScreen) {
        const position = { x: 50, y: 12 };
        const scale = 0.6;
        
        await this.particlesService.loadPolygonParticles(
          'tsparticles-login-bg',
          'icons/unajlogo.svg',
          position,
          scale,
          true
        );
      } else {
        const position = { x: 55, y: 30 };
        const scale = 1.2;
        
        await this.particlesService.loadPolygonParticles(
          'tsparticles-login-bg',
          'icons/unajlogo.svg',
          position,
          scale,
          true
        );
      }
      
    } catch (error) {
      console.error('Error al inicializar partículas:', error);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    setTimeout(() => {
      this.initializeParticles();
    }, 100);
  }
 
login() {
  this.loginMessage = null;

  if (this.username.trim() === '' || this.password.trim() === '') {
    this.isError = true;
    this.loginMessage = 'Todos los campos son obligatorios.';
    this.toastr.error('Todos los campos son obligatorios', 'Error');
    return;
  }

  const user: User = {
    email: this.username,
    password: this.password
  };

  this.loading = true;

  this._userService.login(user).subscribe({
    next: (response: any) => {
      if (!response?.token || !response?.user?.perfil) {
        this.loading = false;
        this.isError = true;
        this.loginMessage = 'Respuesta inválida del servidor. Intente más tarde.';
        this.toastr.error('Respuesta inválida del servidor', 'Error');
        return;
      }

      this.loading = false;
      this.isError = false;
      this.loginMessage = `¡Bienvenido ${response.user.nombre} ${response.user.apellido}! Redirigiendo...`;

      setTimeout(() => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        const perfil = response.user.perfil.nombre;
        this.router.navigate(perfil === 'estudiante' || perfil === 'personal'
          ? ['/admin/dashboard']
          : ['/admin']);
      }, 2000);
    },
    error: (e: HttpErrorResponse) => {
      this.loading = false;
      this.isError = true;

      if (e.status === 401 || e.status === 400) {
        this.loginMessage = 'Usuario o contraseña incorrectos.';
      } else {
        this.loginMessage = 'Ocurrió un error inesperado. Intente más tarde.';
      }
    }
  });
}

}
