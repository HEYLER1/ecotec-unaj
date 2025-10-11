// services/sede.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Sede } from '../interfaces/sede';

// ✅ Interface para la respuesta del backend
interface SedeResponse {
  success: boolean;
  data: Sede[];
}

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sedes';
  }

  getSedes(): Observable<Sede[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // ✅ Mapea la respuesta para extraer solo el array de data
    return this.http.get<SedeResponse>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
      .pipe(
        map(response => response.data)
      );
  }

  getSedeById(id: number): Observable<Sede> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Sede>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers });
  }
}