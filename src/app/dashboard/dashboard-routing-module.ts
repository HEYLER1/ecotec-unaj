// En src/app/dashboard/dashboard-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Cambia la ruta aquí:
import { MainView } from './components/main-view/main-view';

const routes: Routes = [
  {
    path: '',
    component: MainView
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }