import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forms-student',
  standalone: true, // Tu compañero usa standalone, así que lo mantenemos
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './forms-student.html',
  styleUrl: './forms-student.css'
})
export class FormsStudent {
  constructor(private router: Router) {}

  /**
   * Navega de vuelta al dashboard principal (la lista de sedes).
   */
  volverAlDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

}
