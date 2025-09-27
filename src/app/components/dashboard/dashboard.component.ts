// dashboard.component.ts (ACTUALIZADO)

import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { BehaviorSubject } from 'rxjs';
import { Sede } from '../../interfaces/sede';  // <-- CAMBIO 1: Importamos tu nueva interfaz

// CAMBIO 2: Importamos el Router para la navegación
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule, // <-- CAMBIO 3: Añadimos RouterModule a los imports
    NavbarComponent,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  sidebarVisible$ = new BehaviorSubject<boolean>(false);
  
  // Usamos tu nueva interfaz Sede
  campusList: Sede[] = [
    {
      id: 1,
      name: 'SEDE CAPILLA - ADMINISTRATIVO',
      image: 'images/sede.jpg'
    },
    {
      id: 2,
      name: 'SEDE AYABACAS',
      image: 'images/sede.jpg'
    },
    {
      id: 3,
      name: 'SEDE CAPILLA - ACADÉMICO',
      image: 'images/sede.jpg'
    },
    {
      id: 4,
      name: 'SEDE SANTA CATALINA',
      image: 'images/sede.jpg'
    }
  ];
  
  // CAMBIO 4: Inyectamos el Router en el constructor para poder usarlo
  constructor(private router: Router) {}
  
  ngOnInit() {
    console.log('Dashboard inicializado con', this.campusList.length, 'campus');
  }

  // CAMBIO 5: Modificamos la función para que navegue al formulario
  openSede(sedeId: number) {
    const campus = this.campusList.find(c => c.id === sedeId);
    console.log('Navegando al formulario para la sede:', campus?.name);
    // Esta línea usa el Router para cambiar de página
    this.router.navigate(['/admin/waste-form', sedeId]);
  }

  closeSidebar() {
    this.sidebarVisible$.next(false);
  }

  trackByCampusId(index: number, campus: Sede): number {
    return campus.id;
  }
}