import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Sede } from '../../interfaces/sede';

// Imports de Angular Material para las tarjetas
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sede-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  // --- CAMBIOS AQUÍ ---
  // Apuntamos a los nombres de archivo correctos, sin el ".component"
  templateUrl: './sede-list.html',
  styleUrls: ['./sede-list.css']
})
export class SedeListComponent {
  
  campusList: Sede[] = [
    { id: 1, name: 'SEDE CAPILLA - ADMINISTRATIVO', image: 'images/sede.jpg' },
    { id: 2, name: 'SEDE AYABACAS', image: 'images/sede.jpg' },
    { id: 3, name: 'SEDE CAPILLA - ACADÉMICO', image: 'images/sede.jpg' },
    { id: 4, name: 'SEDE SANTA CATALINA', image: 'images/sede.jpg' }
  ];
  
  constructor(private router: Router) {}

  openSede(sedeId: number) {
    this.router.navigate(['/admin/waste-form', sedeId]);
  }

  trackByCampusId(index: number, campus: Sede): number {
    return campus.id;
  }
}
