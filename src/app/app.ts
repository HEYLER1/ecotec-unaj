import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Bienvenida } from './components/bienvenida/bienvenida';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Bienvenida],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecotec-unaj');
}
