import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { CampusCard } from '../campus-card/campus-card';
import { Observable } from 'rxjs';
import { UiService } from '../../../services/ui.service';

@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [CommonModule, Sidebar, Header, CampusCard],
  templateUrl: './main-view.html',
  styleUrls: ['./main-view.css']
})
export class MainView implements OnInit {
  sidebarVisible$!: Observable<boolean>;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.sidebarVisible$ = this.uiService.sidebarVisible$;
  }

  closeSidebar(): void {
    this.uiService.toggleSidebar();
  }
}