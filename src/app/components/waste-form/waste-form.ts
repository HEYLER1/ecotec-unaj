import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sede } from '../../interfaces/sede';
import { Edificio } from '../../interfaces/edificio';

// Imports de Angular Material que usaremos para el formulario
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-waste-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './waste-form.html',
  styleUrls: ['./waste-form.css']
})
export class WasteFormComponent implements OnInit {

  currentUserRole: 'ESTUDIANTE' | 'PERSONAL' = 'PERSONAL'; 

  // --- NUEVO: Variable para controlar la pestaña activa del personal ---
  modoPersonalActivo: 'pilas' | 'canastillas' | 'tacho' = 'pilas';

  private allSedes: Sede[] = [
    { id: 1, name: 'SEDE CAPILLA - ADMINISTRATIVO', image: '' },
    { id: 2, name: 'SEDE AYABACAS', image: '' },
    { id: 3, name: 'SEDE CAPILLA - ACADÉMICO', image: '' },
    { id: 4, name: 'SEDE SANTA CATALINA', image: '' }
  ];

  private allEdificios: Edificio[] = [
    // Sede 1: CAPILLA - ADMINISTRATIVO
    { id: 101, name: 'Rectorado', sedeId: 1 },
    { id: 102, name: 'Oficina Central de Admisión', sedeId: 1 },
    { id: 103, name: 'Contabilidad y Finanzas', sedeId: 1 },
    { id: 104, name: 'Bienestar Universitario', sedeId: 1 },
    
    // Sede 2: AYABACAS
    { id: 201, name: 'Edificio APIAF', sedeId: 2 },
    { id: 202, name: 'Edificio APIIA', sedeId: 2 },
    { id: 203, name: 'Edificio APIER', sedeId: 2 },
    { id: 204, name: 'Edificio EPITC', sedeId: 2 },
    
    // Sede 3: CAPILLA - ACADÉMICO
    { id: 301, name: 'Pabellón de Ingeniería', sedeId: 3 },
    { id: 302, name: 'Biblioteca Central', sedeId: 3 },
    { id: 303, name: 'Laboratorios de Ciencias', sedeId: 3 },
    { id: 304, name: 'Auditorio Magno', sedeId: 3 },
    
    // Sede 4: SANTA CATALINA
    { id: 401, name: 'Facultad de Derecho', sedeId: 4 },
    { id: 402, name: 'Aulas Generales A', sedeId: 4 },
    { id: 403, name: 'Aulas Generales B', sedeId: 4 },
    { id: 404, name: 'Comedor Universitario', sedeId: 4 },
  ];

  sedeActual: Sede | undefined;
  edificiosDeLaSede: Edificio[] = [];
  wasteForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const sedeId = this.route.snapshot.paramMap.get('sedeId');
    
    if (sedeId) {
      const id = parseInt(sedeId, 10);
      this.sedeActual = this.allSedes.find(s => s.id === id);
      this.edificiosDeLaSede = this.allEdificios.filter(e => e.sedeId === id);
      
      this.inicializarFormulario();
    }
  }

  private inicializarFormulario(): void {
    if (this.currentUserRole === 'ESTUDIANTE') {
      this.wasteForm = this.fb.group({
        edificioId: ['', Validators.required],
        pilasCodigo: [''],
        plasticos: [null, Validators.required], 
        organicos: [null, Validators.required],
        vidrio: [null, Validators.required],
        metales: [null, Validators.required],
        papelCarton: [null, Validators.required],
        noAprovechables: [null, Validators.required]
      });
    } else if (this.currentUserRole === 'PERSONAL') {
      this.wasteForm = this.fb.group({
        edificioId: ['', Validators.required],
        pilas: this.fb.group({
          plasticosKg: [null], organicosKg: [null], vidrioKg: [null], metalesKg: [null], papelCartonKg: [null], noAprovechablesKg: [null]
        }),
        canastillas: this.fb.group({ plasticosKg: [null] }),
        tacho: this.fb.group({ papelKg: [null] })
      });
    }
  }

  // --- NUEVO: Función para cambiar la pestaña activa ---
  setModoPersonal(modo: 'pilas' | 'canastillas' | 'tacho'): void {
    this.modoPersonalActivo = modo;
  }

  onSubmit(): void {
    if (this.wasteForm.invalid) {
      this.wasteForm.markAllAsTouched();
      console.error('Formulario inválido');
      return;
    }
    
    console.log('Formulario enviado:', this.wasteForm.value);
    
    this.router.navigate(['/admin/form-success']);
  }
}