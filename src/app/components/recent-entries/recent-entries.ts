import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para un futuro indicador de carga

// Interfaz que define la estructura de un registro
export interface RecentEntry {
  id: number;
  sede: string;
  edificio: string;
  usuario: string;
  fecha: Date;
  rol: 'estudiante' | 'personal';
}

@Component({
  selector: 'app-recent-entries',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './recent-entries.html',
  styleUrl: './recent-entries.css'
})
export class RecentEntriesComponent implements OnInit {

  // El array de registros empieza vacío. Se llenará desde el backend.
  recentEntries: RecentEntry[] = [];
  isLoading: boolean = true; // Para mostrar un indicador de carga al inicio

  constructor() { }

  ngOnInit(): void {
    // Simula una llamada al backend.
    // En el futuro, aquí se llamaría a un servicio para obtener los datos.
    setTimeout(() => {
      // this.dataService.getRecentEntries().subscribe(data => {
      //   this.recentEntries = data;
      //   this.isLoading = false;
      // });
      
      // Como no hay backend, simplemente decimos que la carga ha terminado.
      this.isLoading = false; 
    }, 1000); // Simulamos 1 segundo de carga
  }
}