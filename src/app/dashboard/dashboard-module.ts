// src/app/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { UiService } from '../services/ui.service'; // Asegúrate de que esta ruta sea correcta

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    UiService
  ]
})
export class DashboardModule { }