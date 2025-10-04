import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; // <-- CAMBIO: Importado para usar routerLink

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    RouterModule // <-- CAMBIO: Añadido aquí
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() isVisible = false;
  @Output() closeSidebar = new EventEmitter<void>();

  onCloseSidebar(): void {
    this.closeSidebar.emit();
  }
}