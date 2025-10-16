import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { PLATFORM_ID, Inject } from '@angular/core';

import { Sede } from '../../interfaces/sede';
import { Edificio } from '../../interfaces/edificio';
import { TipoRecoleccion } from '../../interfaces/tipo-recoleccion.interface';
import { SedeService } from '../../services/sede.service';
import { EdificioService } from '../../services/edificio.service';
import { TipoRecoleccionService } from '../../services/tipo-recoleccion.service';
import { RegistroPersonalService } from '../../services/registro-personal.service';

// Imports de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

type ModoPersonal = 'pilas' | 'canastillas' | 'tacho';

interface CampoRecoleccion {
  nombre: string;
  label: string;
  formControlName: string;
  tipo: 'number' | 'text';
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

@Component({
  selector: 'app-form-personal',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './form-personal.html',
  styleUrl: './form-personal.css'
})
export class FormPersonal implements OnInit, OnDestroy {

  // ===== PROPIEDADES =====
  modoPersonalActivo: ModoPersonal = 'pilas';
  sedeActual: Sede | null = null;
  edificiosDeLaSede: Edificio[] = [];
  tiposRecoleccion: TipoRecoleccion[] = [];
  staffForm!: FormGroup;
  isLoading = true;
  hasError = false;
  isSubmitting = false;

  private destroy$ = new Subject<void>();

  // ✅ Definir campos por tipo de recolección
  private camposPorTipo: { [key: string]: CampoRecoleccion[] } = {
    'pilas': [
      { nombre: 'plasticosKg', label: 'Plásticos', formControlName: 'plasticosKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' },
      { nombre: 'organicosKg', label: 'Orgánicos', formControlName: 'organicosKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' },
      { nombre: 'vidrioKg', label: 'Vidrio', formControlName: 'vidrioKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' },
      { nombre: 'metalesKg', label: 'Metales', formControlName: 'metalesKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' },
      { nombre: 'papelCartonKg', label: 'Papel y Cartón', formControlName: 'papelCartonKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' },
      { nombre: 'noApropiablesKg', label: 'No aprovechables', formControlName: 'noApropiablesKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' }
    ],
    'canastillas': [
      { nombre: 'plasticosKg', label: 'Plásticos', formControlName: 'plasticosKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' }
    ],
    'tacho': [
      { nombre: 'papelKg', label: 'Papeles', formControlName: 'papelKg', tipo: 'number', min: 0, step: 0.01, placeholder: '0.00' }
    ]
  };

  // ===== CONSTRUCTOR =====
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private sedeService: SedeService,
    private edificioService: EdificioService,
    private tipoRecoleccionService: TipoRecoleccionService,
    private registroPersonalService: RegistroPersonalService,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeForm();
  }

  // ===== LIFECYCLE HOOKS =====
  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===== MÉTODOS PRIVADOS =====
  
  private cargarDatosIniciales(): void {
    const sedeIdParam = this.route.snapshot.paramMap.get('sedeId');
    
    if (!sedeIdParam) {
      console.error('❌ No se encontró sedeId en la URL');
      this.handleError('No se proporcionó un ID de sede válido');
      return;
    }

    const id_sede = parseInt(sedeIdParam, 10);
    
    if (isNaN(id_sede)) {
      console.error('❌ sedeId no es un número válido:', sedeIdParam);
      this.handleError('ID de sede inválido');
      return;
    }

    console.log('🔍 Cargando datos para sede ID:', id_sede);
    this.cargarDatos(id_sede);
  }

  private cargarDatos(id_sede: number): void {
    this.isLoading = true;
    this.hasError = false;

    forkJoin({
      sede: this.sedeService.getSedeById(id_sede),
      edificios: this.edificioService.getEdificiosBySede(id_sede),
      tiposRecoleccion: this.tipoRecoleccionService.getTiposRecoleccion()
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: ({ sede, edificios, tiposRecoleccion }) => {
          this.sedeActual = sede;
          this.edificiosDeLaSede = edificios;
          this.tiposRecoleccion = tiposRecoleccion;
          
          console.log('✅ Sede cargada:', sede);
          console.log('✅ Edificios cargados:', edificios.length);
          console.log('✅ Tipos de recolección cargados:', tiposRecoleccion);
          
          // ✅ AUTOSELECCIONAR PRIMER EDIFICIO SI SOLO HAY UNO
          if (edificios.length === 1) {
            this.staffForm.patchValue({
              edificioId: edificios[0].id_edificio
            });
            console.log('✅ Edificio autoseleccionado:', edificios[0].nombre);
          }
          
          if (edificios.length === 0) {
            console.warn('⚠️ No hay edificios disponibles para esta sede');
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar datos:', error);
          this.handleError('No se pudieron cargar los datos de la sede');
        }
      });
  }

  private handleError(message: string): void {
    this.hasError = true;
    this.isLoading = false;
    console.error('❌', message);
  }

  private initializeForm(): void {
    this.staffForm = this.fb.group({
      edificioId: ['', Validators.required],
      pilas: this.fb.group({
        plasticosKg: [null, [Validators.min(0)]], 
        organicosKg: [null, [Validators.min(0)]], 
        vidrioKg: [null, [Validators.min(0)]], 
        metalesKg: [null, [Validators.min(0)]], 
        papelCartonKg: [null, [Validators.min(0)]], 
        noApropiablesKg: [null, [Validators.min(0)]]
      }),
      canastillas: this.fb.group({ 
        plasticosKg: [null, [Validators.min(0)]] 
      }),
      tacho: this.fb.group({ 
        papelKg: [null, [Validators.min(0)]] 
      })
    });
  }

  private construirDatosEnvio(): any {
    const formValue = this.staffForm.value;
    const tipoRecoleccion = this.obtenerTipoRecoleccionId();

    return {
      edificio_id: parseInt(formValue.edificioId),
      tipo_recoleccion_id: tipoRecoleccion,
      observaciones: '',
      ...this.obtenerDatosSegunModo(formValue)
    };
  }

  private obtenerTipoRecoleccionId(): number {
    const tipoEncontrado = this.tiposRecoleccion.find(t => 
      t.nombre.toLowerCase().includes(this.modoPersonalActivo.toLowerCase())
    );
    
    console.log('🔍 Buscando tipo para modo:', this.modoPersonalActivo);
    console.log('🔍 Tipo encontrado:', tipoEncontrado);
    
    return tipoEncontrado?.id_tipo_recoleccion || 1;
  }

  private obtenerDatosSegunModo(formValue: any): any {
    switch (this.modoPersonalActivo) {
      case 'pilas':
        return {
          detalle_pilas: {
            plasticos_kg: parseFloat(formValue.pilas.plasticosKg) || 0,
            organicos_kg: parseFloat(formValue.pilas.organicosKg) || 0,
            vidrio_kg: parseFloat(formValue.pilas.vidrioKg) || 0,
            metales_kg: parseFloat(formValue.pilas.metalesKg) || 0,
            papel_carton_kg: parseFloat(formValue.pilas.papelCartonKg) || 0,
            no_aprovechables_kg: parseFloat(formValue.pilas.noApropiablesKg) || 0
          }
        };
      case 'canastillas':
        return {
          detalle_canastillas: {
            plasticos_kg: parseFloat(formValue.canastillas.plasticosKg) || 0
          }
        };
      case 'tacho':
        return {
          detalle_tacho: {
            papel_kg: parseFloat(formValue.tacho.papelKg) || 0
          }
        };
    }
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' = 'success'): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: tipo === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // ===== MÉTODOS PÚBLICOS =====

  getCamposActuales(): CampoRecoleccion[] {
    return this.camposPorTipo[this.modoPersonalActivo] || [];
  }

  getFormGroupName(): string {
    return this.modoPersonalActivo;
  }

  getModoFromTipo(tipo: TipoRecoleccion): ModoPersonal {
    const nombreLower = tipo.nombre.toLowerCase();
    
    if (nombreLower.includes('pila')) return 'pilas';
    if (nombreLower.includes('canastilla')) return 'canastillas';
    if (nombreLower.includes('papel') || nombreLower.includes('tacho') || nombreLower.includes('ofi')) return 'tacho';
    
    return 'pilas';
  }

  setModoPersonalFromTipo(tipo: TipoRecoleccion): void {
    const modo = this.getModoFromTipo(tipo);
    this.setModoPersonal(modo);
  }

  setModoPersonal(modo: ModoPersonal): void {
    this.modoPersonalActivo = modo;
    console.log('🔄 Modo cambiado a:', modo);
  }

  onSubmit(): void {
    // ✅ DEBUGGING COMPLETO
    console.log('📋 Estado del formulario:');
    console.log('  - Válido:', this.staffForm.valid);
    console.log('  - Valor:', this.staffForm.value);
    console.log('  - edificioId:', this.staffForm.get('edificioId')?.value);
    console.log('  - Edificios disponibles:', this.edificiosDeLaSede.length);

    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      console.error('❌ Formulario inválido');
      
      // ✅ MOSTRAR ERRORES ESPECÍFICOS
      Object.keys(this.staffForm.controls).forEach(key => {
        const control = this.staffForm.get(key);
        if (control?.invalid) {
          console.error(`❌ Campo inválido: ${key}`, control.errors);
        }
      });
      
      this.mostrarMensaje('Por favor complete todos los campos requeridos', 'error');
      return;
    }

    // ✅ VERIFICAR TOKEN
    const token = this.getToken();
    if (!token) {
      console.error('❌ No hay token');
      this.mostrarMensaje('Sesión expirada. Por favor inicie sesión nuevamente', 'error');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }

    const datosEnvio = this.construirDatosEnvio();
    console.log('📤 Datos a enviar:', datosEnvio);

    this.isSubmitting = true;

    this.registroPersonalService.crearRegistro(datosEnvio)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: (response) => {
          console.log('✅ Registro creado exitosamente:', response);
          this.mostrarMensaje('✅ Registro guardado exitosamente', 'success');
          
          // ✅ LIMPIAR FORMULARIO
          this.staffForm.reset();
          this.staffForm.patchValue({ edificioId: '' });
          
          // ✅ REDIRIGIR DESPUÉS DE ÉXITO
          setTimeout(() => {
            this.router.navigate(['/admin/form-success']);
          }, 1500);
        },
        error: (error) => {
          console.error('❌ Error al crear registro:', error);
          console.error('❌ Error completo:', JSON.stringify(error, null, 2));
          
          // ✅ MANEJO ESPECÍFICO DE ERRORES
          if (error.status === 401) {
            this.mostrarMensaje('Sesión expirada. Redirigiendo al login...', 'error');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else if (error.status === 400) {
            const mensajeError = error.error?.msg || 'Datos inválidos';
            this.mostrarMensaje(mensajeError, 'error');
          } else if (error.status === 404) {
            this.mostrarMensaje('Servicio no disponible. Verifique la configuración del servidor', 'error');
          } else {
            let mensajeError = 'Error al guardar el registro';
            if (error.error?.msg) {
              mensajeError = error.error.msg;
            } else if (error.error?.error) {
              mensajeError = error.error.error;
            }
            this.mostrarMensaje(mensajeError, 'error');
          }
        }
      });
  }

  volverASedes(): void {
    this.router.navigate(['/admin/sedes']);
  }
}