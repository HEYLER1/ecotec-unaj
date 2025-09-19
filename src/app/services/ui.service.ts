import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(false);
  sidebarVisible$: Observable<boolean> = this.sidebarVisibleSubject.asObservable();

  constructor() {}

  toggleSidebar() {
    const currentValue = this.sidebarVisibleSubject.value;
    this.sidebarVisibleSubject.next(!currentValue);
  }
}