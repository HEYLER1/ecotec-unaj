import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,   // ✅ si quieres standalone
  imports: [],
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.css']   // ✅ plural y array
})
export class Spinner {}
