import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar *ngFor y *ngIf

@Component({
  selector: 'app-campus-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campus-card.html',
  styleUrls: ['./campus-card.css']
})
export class CampusCard {
  @Input() campusImage: string = '';
  @Input() campusName: string = '';
}