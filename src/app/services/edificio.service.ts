// services/edificio.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Edificio } from '../interfaces/edificio';

// ✅ Interface para la respuesta del backend
interface EdificioResponse {
  success: boolean;
  data: Edificio[];
}

interface EdificioSingleResponse {
  success: boolean;
  data: Edificio;
}

@Injectable({
  providedIn: 'root'
})
export class EdificioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/edificios';
  }

  // ✅ Obtener todos los edificios
  getEdificios(): Observable<Edificio[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<EdificioResponse>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
      .pipe(
        map(response => response.data)
      );
  }

  // ✅ Obtener edificios filtrados por sede (LO QUE NECESITAS)
  getEdificiosBySede(id_sede: number): Observable<Edificio[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<EdificioResponse>(`${this.myAppUrl}${this.myApiUrl}/sede/${id_sede}`, { headers })
      .pipe(
        map(response => response.data)
      );
  }

  // ✅ Obtener un edificio por ID
  getEdificioById(id: number): Observable<Edificio> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<EdificioSingleResponse>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers })
      .pipe(
        map(response => response.data)
      );
  }
}