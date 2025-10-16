import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sede } from '../../interfaces/sede';
import { Edificio } from '../../interfaces/edificio';
import { RegistroEstudianteService } from '../../services/registro-estudiante.service';
import { RegistroEstudiante } from '../../interfaces/registro-estudiante';

// Imports de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule
  ],
  templateUrl: './forms-student.html', 
  styleUrl: './forms-student.css'
})
export class FormEstudianteComponent implements OnInit {

  loading = false;
  errorMsg: string = '';

  // Estructura para manejar los tipos de residuo con el orden y colores oficiales
  residueTypes = [
    { formControl: 'papelCarton', name: 'Papel y Cartón', color: '#3498db', textColor: '#FFFFFF' },
    { formControl: 'plasticos', name: 'Plásticos', color: '#FFFFFF', textColor: '#000000' },
    { formControl: 'metales', name: 'Metales', color: '#f1c40f', textColor: '#000000' },
    { formControl: 'organicos', name: 'Orgánicos', color: '#6F4E37', textColor: '#FFFFFF' },
    { formControl: 'vidrio', name: 'Vidrios', color: '#808080', textColor: '#FFFFFF' },
    { formControl: 'noAprovechables', name: 'No aprovechables', color: '#000000', textColor: '#FFFFFF' }
  ];
  
  private allSedes: Sede[] = [
    { id_sede: 1, nombre: 'SEDE CAPILLA - ADMINISTRATIVO', imagen: '', estado: 1},
    { id_sede: 2, nombre: 'SEDE AYABACAS', imagen: '', estado: 1 },
    { id_sede: 3, nombre: 'SEDE CAPILLA - ACADÉMICO', imagen: '', estado: 1 },
    { id_sede: 4, nombre: 'SEDE SANTA CATALINA', imagen: '', estado: 1 }
  ];

  private allEdificios: Edificio[] = [
    { id_edificio: 101, nombre: 'Edificio Sede Capilla Administrativo', sede_id: 1, estado: 1 },
    { id_edificio: 201, nombre: 'Edificio APIAF', sede_id: 2, estado: 1 },
    { id_edificio: 202, nombre: 'Edificio APIIA', sede_id: 2, estado: 1 },
    { id_edificio: 203, nombre: 'Edificio APIER', sede_id: 2, estado: 1 },
    { id_edificio: 204, nombre: 'Edificio EPITC', sede_id: 2, estado: 1 },
    { id_edificio: 301, nombre: 'Aulas Generales', sede_id: 3, estado: 1 },
    { id_edificio: 302, nombre: 'Laboratorios Generales', sede_id: 3, estado: 1 },
    { id_edificio: 303, nombre: 'Edificio de Bienestar', sede_id: 3, estado: 1 },
    { id_edificio: 304, nombre: 'Auditorio Magno', sede_id: 3, estado: 1 },
    { id_edificio: 305, nombre: 'Campo Recreacional', sede_id: 3, estado: 1 },
    { id_edificio: 306, nombre: 'Patio en General', sede_id: 3, estado: 1 },
    { id_edificio: 401, nombre: 'Edificio Sede Santa Catalina', sede_id: 4, estado: 1 },
  ];

  sedeActual: Sede | undefined;
  edificiosDeLaSede: Edificio[] = [];
  studentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private registroEstudianteService: RegistroEstudianteService
  ) {}

  ngOnInit(): void {
    const sedeId = this.route.snapshot.paramMap.get('sedeId');
    
    if (sedeId) {
      const id = parseInt(sedeId, 10);
      this.sedeActual = this.allSedes.find(s => s.id_sede === id);
      this.edificiosDeLaSede = this.allEdificios.filter(e => e.sede_id === id);
      this.initializeForm();
    }
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
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      this.errorMsg = 'Por favor completa todos los campos requeridos';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

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

    this.registroEstudianteService.createRegistro(registro).subscribe({
      next: (data) => {
        this.loading = false;
        console.log('✅ Registro de estudiante creado exitosamente:', data);
        this.router.navigate(['/admin/form-success']);
      },
      error: (error) => {
        this.loading = false;
        console.error('❌ Error al crear registro:', error);
        this.errorMsg = error.error?.msg || 'Error al crear el registro';
      }
    });
  }
}