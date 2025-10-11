// src/app/services/UserInfo.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProfileResponse } from '../interfaces/UserInfo'; // ✅ DEBE ser UserProfileResponse

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/profile';
  }// ASEGÚRATE que retorna Observable<UserProfileResponse>
  getUserProfile(): Observable<UserProfileResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    const url = `${this.myAppUrl}${this.myApiUrl}/me`;
    console.log(' Llamando a:', url);
  // Debe ser UserProfileResponse aquí también
    return this.http.get<UserProfileResponse>(url, { headers });
  }
}