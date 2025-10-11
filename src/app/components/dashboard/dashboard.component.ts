// dashboard.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,      // ✅ Para <router-outlet>
    NavbarComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  sidebarVisible$ = new BehaviorSubject<boolean>(false);
  
  constructor() {}
  
  closeSidebar() {
    this.sidebarVisible$.next(false);
  }
}