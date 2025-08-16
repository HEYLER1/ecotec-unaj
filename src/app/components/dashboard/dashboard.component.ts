import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../navbar/navbar.component'; // 👈 IMPORTAR
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true, // 👈 asegúrate de marcarlo como standalone
  imports: [NavbarComponent,CommonModule], // 👈 IMPORTAR aquí el navbar
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listProduct: Product[] = [];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    });
  }
}
