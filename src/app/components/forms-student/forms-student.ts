import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sede } from '../../interfaces/sede';
import { Edificio } from '../../interfaces/edificio';

// Imports de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './forms-student.html', 
  styleUrl: './forms-student.css'
})
export class FormEstudianteComponent implements OnInit {

  // --- CAMBIO: Estructura para manejar los tipos de residuo con el orden y colores oficiales ---
  residueTypes = [
    { formControl: 'papelCarton', name: 'Papel y Cartón', color: '#1C5EFB', textColor: '#FFFFFF' }, // Azul
    { formControl: 'plasticos', name: 'Plásticos', color: '#FFFFFF', textColor: '#000000' },          // Blanco
    { formControl: 'metales', name: 'Metales', color: '#FFEB00', textColor: '#000000' },              // Amarillo
    { formControl: 'organicos', name: 'Orgánicos', color: '#6F4E37', textColor: '#FFFFFF' },          // Marrón
    { formControl: 'vidrio', name: 'Vidrios', color: '#808080', textColor: '#FFFFFF' },                // Plomo
    { formControl: 'noAprovechables', name: 'No aprovechables', color: '#000000', textColor: '#FFFFFF' }  // Negro
  ];
  
  private allSedes: Sede[] = [
    { id_sede: 11, nombre: 'SEDE CAPILLA - ADMINISTRATIVO', imagen: '', estado :1},
    { id_sede: 21, nombre: 'SEDE AYABACAS', imagen: '', estado : 1 },
    {id_sede: 31, nombre: 'SEDE CAPILLA - ACADÉMICO', imagen: '', estado: 1 },
    { id_sede: 41, nombre: 'SEDE SANTA CATALINA', imagen: '', estado: 1 }
  ];

  private allEdificios: Edificio[] = [
    { id: 101, name: 'Edificio Sede Capilla Administrativo', sedeId: 11 },
    { id: 201, name: 'Edificio EPIAF', sedeId: 21 },
    { id: 202, name: 'Edificio EPIIA', sedeId: 21 },
    { id: 203, name: 'Edificio EPIER', sedeId: 21 },
    { id: 204, name: 'Edificio EPITC', sedeId: 21 },
    { id: 205, name: 'Campo Recreacional', sedeId: 21 },
    { id: 301, name: 'Aulas Generales', sedeId: 31 },
    { id: 302, name: 'Laboratorios Generales', sedeId: 31 },
    { id: 303, name: 'Edificio de Bienestar', sedeId: 31 },
    { id: 304, name: 'Auditorio Magno', sedeId: 31 },
    { id: 305, name: 'Campo Recreacional', sedeId: 31 },
    { id: 306, name: 'Patio en General', sedeId: 31 },
    { id: 401, name: 'Edificio Sede Santa Catalina', sedeId: 41 },
  ];

  sedeActual: Sede | undefined;
  edificiosDeLaSede: Edificio[] = [];
  studentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const sedeId = this.route.snapshot.paramMap.get('sedeId');
    
    if (sedeId) {
      const id = parseInt(sedeId, 10);
      this.sedeActual = this.allSedes.find(s => s.id_sede === id);
      this.edificiosDeLaSede = this.allEdificios.filter(e => e.sedeId === id);
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.studentForm = this.fb.group({
      edificioId: ['', Validators.required],
      pilasCodigo: [''],
      // Los nombres de los controles no cambian, solo su representación visual
      plasticos: [null, Validators.required], 
      organicos: [null, Validators.required],
      vidrio: [null, Validators.required],
      metales: [null, Validators.required],
      papelCarton: [null, Validators.required],
      noAprovechables: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      console.error('Formulario de estudiante inválido');
      return;
    }
    
    console.log('Formulario de estudiante enviado:', this.studentForm.value);
    
    this.router.navigate(['/admin/form-success']);
  }
}