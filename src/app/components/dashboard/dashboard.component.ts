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

// Interfaz para el Campus
interface Campus {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
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
  
  // Propiedad necesaria para el overlay del sidebar
  sidebarVisible$ = new BehaviorSubject<boolean>(false);
  
  // Lista de campus reutilizable
  campusList: Campus[] = [
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
  
  ngOnInit() {
    // Inicialización del componente si es necesario
    console.log('Dashboard inicializado con', this.campusList.length, 'campus');
  }

  openSede(sedeId: number) {
    const campus = this.campusList.find(c => c.id === sedeId);
    console.log('Abrir sede:', campus?.name);
    // Aquí puedes navegar a la página de la sede
  }

  // Método necesario para cerrar el sidebar (usado en el overlay)
  closeSidebar() {
    this.sidebarVisible$.next(false);
  }

  // TrackBy function para optimizar el *ngFor
  trackByCampusId(index: number, campus: Campus): number {
    return campus.id;
  }
}