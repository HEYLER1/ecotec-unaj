import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
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
  listProduct: Product[] = [];
  isLoading = true;
  
  // Datos de las sedes para reportes ambientales
  sedes = [
    {
      id: 1,
      name: 'Sede Capilla',
      location: 'Capilla',
      description: 'Monitoreo de desbordes de basura en zona urbana',
      color: '#1976d2',
      activeReports: 8,
      resolvedReports: 24,
      lastActivity: '2 horas',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Sede Ayabacas',
      location: 'Ayabacas',
      description: 'Control ambiental en zona rural y periférica',
      color: '#388e3c',
      activeReports: 5,
      resolvedReports: 18,
      lastActivity: '4 horas',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      name: 'Sede Santa Catalina',
      location: 'Santa Catalina',
      description: 'Gestión de residuos en zona comercial y residencial',
      color: '#f57c00',
      activeReports: 12,
      resolvedReports: 31,
      lastActivity: '1 hora',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Sede Administrativa',
      location: 'Centro Administrativo',
      description: 'Coordinación general y reportes consolidados',
      color: '#7b1fa2',
      activeReports: 3,
      resolvedReports: 45,
      lastActivity: '30 min',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop'
    }
  ];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    // Simular carga
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    });
  }

  openSede(sedeId: number) {
    console.log('Abrir sede:', sedeId);
    // Aquí puedes navegar a la página de la sede
  }

  openSedeMenu(event: Event, sedeId: number) {
    event.stopPropagation();
    console.log('Menú de sede:', sedeId);
  }
}