// ===== app.component.ts - COMPONENTE PRINCIPAL =====
// app.ts (o app.component.ts)
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- Aquí puedes agregar header/navbar si quieres -->
    <router-outlet></router-outlet>
  `,
  styleUrls: []
})
export class App {
  title = 'ecotec-unaj';
}