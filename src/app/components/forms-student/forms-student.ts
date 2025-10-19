import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { Sede } from '../../interfaces/sede';
import { Edificio } from '../../interfaces/edificio';
import { RegistroEstudianteService } from '../../services/registro-estudiante.service';
import { SedeService } from '../../services/sede.service';
import { EdificioService } from '../../services/edificio.service';
import { RegistroEstudiante } from '../../interfaces/registro-estudiante';

// Imports de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-estudiante',
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
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './forms-student.html', 
  styleUrl: './forms-student.css'
})
export class FormEstudianteComponent implements OnInit, OnDestroy {

  loading = false;
  isLoading = true;
  isSubmitting = false;
  hasError = false;
  errorMsg: string = '';

  sedeActual: Sede | null = null;
  edificiosDeLaSede: Edificio[] = [];
  studentForm!: FormGroup;

  private destroy$ = new Subject<void>();

  // Estructura para manejar los tipos de residuo con el orden y colores oficiales
  residueTypes = [
    { formControl: 'papelCarton', name: 'Papel y Cartón', color: '#3498db', textColor: '#FFFFFF' },
    { formControl: 'plasticos', name: 'Plásticos', color: '#FFFFFF', textColor: '#000000' },
    { formControl: 'metales', name: 'Metales', color: '#f1c40f', textColor: '#000000' },
    { formControl: 'organicos', name: 'Orgánicos', color: '#6F4E37', textColor: '#FFFFFF' },
    { formControl: 'vidrio', name: 'Vidrios', color: '#808080', textColor: '#FFFFFF' },
    { formControl: 'noAprovechables', name: 'No aprovechables', color: '#000000', textColor: '#FFFFFF' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private registroEstudianteService: RegistroEstudianteService,
    private sedeService: SedeService,
    private edificioService: EdificioService,
    private snackBar: MatSnackBar
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
      edificios: this.edificioService.getEdificiosBySede(id_sede)
    })
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: ({ sede, edificios }) => {
          this.sedeActual = sede;
          this.edificiosDeLaSede = edificios;
          
          console.log('✅ Sede cargada:', sede);
          console.log('✅ Edificios cargados:', edificios.length);
          
          // Auto-seleccionar si solo hay un edificio
          if (edificios.length === 1) {
            this.studentForm.patchValue({
              edificioId: edificios[0].id_edificio
            });
            console.log('🏢 Edificio autoseleccionado:', edificios[0].nombre);
          }
          
          if (edificios.length === 0) {
            console.warn('⚠️ No hay edificios disponibles para esta sede');
            this.mostrarMensaje('No hay edificios disponibles en esta sede', 'error');
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar datos:', error);
          this.handleError('No se pudieron cargar los datos de la sede');
          this.mostrarMensaje('Error al cargar la información de la sede', 'error');
        }
      });
  }

  private handleError(message: string): void {
    this.hasError = true;
    this.isLoading = false;
    this.errorMsg = message;
    console.error('❌', message);
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      edificioId: ['', Validators.required],
      codigoPila: ['', Validators.required],
      observaciones: [''],
      // Checkboxes para verificación de residuos
      papelCarton: [false, Validators.required], 
      plasticos: [false, Validators.required],
      metales: [false, Validators.required],
      organicos: [false, Validators.required],
      vidrio: [false, Validators.required],
      noAprovechables: [false, Validators.required]
    });
  }

  onSubmit(): void {
    console.log('📋 Estado del formulario:');
    console.log('  - Válido:', this.studentForm.valid);
    console.log('  - Valor:', this.studentForm.value);

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.errorMsg = 'Por favor completa todos los campos requeridos';
      
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        if (control?.invalid) {
          console.error(`❌ Campo inválido: ${key}`, control.errors);
        }
      });
      
      this.mostrarMensaje('Por favor completa todos los campos requeridos', 'error');
      return;
    }

    this.loading = true;
    this.isSubmitting = true;
    this.errorMsg = '';
    this.studentForm.disable();

    const formValue = this.studentForm.value;

    // Construir objeto según la interfaz RegistroEstudiante
    const registro: RegistroEstudiante = {
      edificio_id: parseInt(formValue.edificioId),
      codigo_pila: formValue.codigoPila,
      observaciones: formValue.observaciones || undefined,
      verificacion: {
        papel_carton: formValue.papelCarton === true,
        plasticos: formValue.plasticos === true,
        metales: formValue.metales === true,
        organicos: formValue.organicos === true,
        vidrio: formValue.vidrio === true,
        no_aprovechables: formValue.noAprovechables === true
      }
    };

    console.log('📤 Enviando datos:', registro);

    this.registroEstudianteService.createRegistro(registro)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loading = false;
          this.isSubmitting = false;
          this.studentForm.enable();
        })
      )
      .subscribe({
        next: (data) => {
          console.log('✅ Registro de estudiante creado exitosamente:', data);
          this.mostrarMensaje('Registro guardado exitosamente', 'success');
          
          setTimeout(() => {
            this.router.navigate(['/admin/form-success']);
          }, 800);
        },
        error: (error) => {
          console.error('❌ Error al crear registro:', error);
          
          if (error.status === 401) {
            this.errorMsg = 'Sesión expirada. Redirigiendo al login...';
            this.mostrarMensaje(this.errorMsg, 'error');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else if (error.status === 403) {
            this.errorMsg = error.error?.msg || 'No tienes permiso para realizar esta acción';
            this.mostrarMensaje(this.errorMsg, 'error');
          } else if (error.status === 400) {
            this.errorMsg = error.error?.msg || 'Datos inválidos';
            this.mostrarMensaje(this.errorMsg, 'error');
          } else {
            this.errorMsg = error.error?.msg || 'Error al crear el registro';
            this.mostrarMensaje(this.errorMsg, 'error');
          }
        }
      });
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' = 'success'): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: tipo === 'success' ? ['snackbar-success'] : ['snackbar-error']
    });
  }

  volverASedes(): void {
    this.router.navigate(['/admin/sedes']);
  }
}