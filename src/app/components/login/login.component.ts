// login.component.ts
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
    if (this.username.trim() === '' || this.password.trim() === '') {
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
        console.log('respuesta completa del backend:', response); 
        
        if (!response || !response.token) {
          this.toastr.error('Respuesta inválida del servidor', 'Error');
          this.loading = false;
          return;
        }
        
        if (!response.user) {
          this.toastr.error('Datos de usuario no recibidos', 'Error');
          this.loading = false;
          return;
        }
        
        if (!response.user.perfil) {
          this.toastr.error('Perfil de usuario no recibido', 'Error');
          this.loading = false;
          return;
        }
        
        // Guardar en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        //  Obtener el nombre del perfil desde la BD
        const userPerfil = response.user.perfil.nombre;
        console.log('👤 Perfil del usuario:', userPerfil);

        //  Redirección según perfil de la BD
        if (userPerfil === 'estudiante') {
          this.router.navigate(['/admin/dashboard']); 
          this.toastr.success(`Bienvenido ${response.user.nombre} ${response.user.apellido}`, 'Login exitoso');
        } else if (userPerfil === 'personal') {
          this.router.navigate(['/admin/dashboard']);
          this.toastr.success(`Bienvenido ${response.user.nombre} ${response.user.apellido}`, 'Login exitoso');
        } else {
          // Perfil desconocido
          this.router.navigate(['/admin']);
          this.toastr.info('Sesión iniciada', 'Bienvenido');
        }
        
        this.loading = false;
      },
      error: (e: HttpErrorResponse) => {
        console.error('Error HTTP:', e);
        this._errorService.msjError(e);
        this.loading = false;
      }
    });
  }
}



/*
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
  username: string = '';
  password: string = '';
  loading: boolean = false;
  selectedRole: string = 'estudiante'; // Por defecto estudiante, para corregi pendiente 

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
    if (this.username.trim() === '' || this.password.trim() === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    const user: User = {
      email: this.username,
      password: this.password,
      roleName: this.selectedRole
    };
    this.loading = true;
    this._userService.login(user).subscribe({
      next: (response: any) => {
        console.log(' Respuesta completa del backend:', response); 
        
        //  SEGURIDAD
        if (!response || !response.token) {
          this.toastr.error('Respuesta inválida del servidor', 'Error');
          this.loading = false;
          return;
        }
        
        if (!response.user) {
          this.toastr.error('Datos de usuario no recibidos', 'Error');
          this.loading = false;
          return;
        }
        
        if (!response.user.role) {
          this.toastr.error('Rol de usuario no recibido', 'Error');
          this.loading = false;
          return;
        }
        
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        const userRole = response.user.role.nombre;

//  roles 
        if (userRole === 'estudiante') {
          this.router.navigate(['/admin/dashboard']); 
          this.toastr.success('Bienvenido estudiante', 'Login exitoso');
        } else if (userRole === 'personal') {
          this.router.navigate(['/admin/dashboard']);
          this.toastr.success('Bienvenido personal', 'Login exitoso');
        } else {
          this.router.navigate(['/admin']);
        }
        
        this.loading = false;
      },
      error: (e: HttpErrorResponse) => {
        console.error('Error HTTP:', e);
        this._errorService.msjError(e);
        this.loading = false;
      }
    });
  }

}*/