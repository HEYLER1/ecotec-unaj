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
    MatIconModule
  ],
  templateUrl: './form-personal.html',
  styleUrl: './form-personal.css'
})
export class FormPersonal implements OnInit {

  // --- Lógica del Personal movida desde waste-form ---
  
  modoPersonalActivo: 'pilas' | 'canastillas' | 'tacho' = 'pilas';

  private allSedes: Sede[] = [
    { id: 1, name: 'SEDE CAPILLA - ADMINISTRATIVO', image: '' },
    { id: 2, name: 'SEDE AYABACAS', image: '' },
    { id: 3, name: 'SEDE CAPILLA - ACADÉMICO', image: '' },
    { id: 4, name: 'SEDE SANTA CATALINA', image: '' }
  ];

  private allEdificios: Edificio[] = [
    { id: 101, name: 'Edificio Sede Capilla Administrativo', sedeId: 1 },
    { id: 201, name: 'Edificio APIAF', sedeId: 2 },
    { id: 202, name: 'Edificio APIIA', sedeId: 2 },
    { id: 203, name: 'Edificio APIER', sedeId: 2 },
    { id: 204, name: 'Edificio EPITC', sedeId: 2 },
    { id: 301, name: 'Aulas Generales', sedeId: 3 },
    { id: 302, name: 'Laboratorios Generales', sedeId: 3 },
    { id: 303, name: 'Edificio de Bienestar', sedeId: 3 },
    { id: 304, name: 'Auditorio Magno', sedeId: 3 },
    { id: 305, name: 'Campo Recreacional', sedeId: 3 },
    { id: 306, name: 'Patio en General', sedeId: 3 },
    { id: 401, name: 'Edificio Sede Santa Catalina', sedeId: 4 },
  ];

  sedeActual: Sede | undefined;
  edificiosDeLaSede: Edificio[] = [];
  staffForm!: FormGroup; // Renombrado para mayor claridad

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
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    // Aquí solo creamos el formulario del Personal
    this.staffForm = this.fb.group({
      edificioId: ['', Validators.required],
      pilas: this.fb.group({
        plasticosKg: [null], organicosKg: [null], vidrioKg: [null], metalesKg: [null], papelCartonKg: [null], noApropiablesKg: [null]
      }),
      canastillas: this.fb.group({ plasticosKg: [null] }),
      tacho: this.fb.group({ papelKg: [null] })
    });
  }

  setModoPersonal(modo: 'pilas' | 'canastillas' | 'tacho'): void {
    this.modoPersonalActivo = modo;
  }

  onSubmit(): void {
    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      console.error('Formulario de personal inválido');
      return;
    }
    
    console.log('Formulario de personal enviado:', this.staffForm.value);
    
    this.router.navigate(['/admin/form-success']);
  }
}