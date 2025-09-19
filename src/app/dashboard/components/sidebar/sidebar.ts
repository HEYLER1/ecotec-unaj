import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar implements OnInit {
  sidebarVisible$!: Observable<boolean>;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.sidebarVisible$ = this.uiService.sidebarVisible$;
  }

  closeSidebar(): void {
    this.uiService.toggleSidebar();
  }
}