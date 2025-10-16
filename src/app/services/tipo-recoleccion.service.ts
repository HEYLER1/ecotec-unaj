// services/tipo-recoleccion.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoRecoleccion } from '../interfaces/tipo-recoleccion.interface';

interface TipoRecoleccionResponse {
  success: boolean;
  data: TipoRecoleccion[];
}

@Injectable({
  providedIn: 'root'
})
export class TipoRecoleccionService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/tipos-recoleccion';
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /**
   * Obtener todos los tipos de recolección activos
   */
  getTiposRecoleccion(): Observable<TipoRecoleccion[]> {
    return this.http.get<TipoRecoleccionResponse>(
      `${this.myAppUrl}${this.myApiUrl}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtener un tipo de recolección por ID
   */
  getTipoRecoleccionById(id: number): Observable<TipoRecoleccion> {
    return this.http.get<{ success: boolean; data: TipoRecoleccion }>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data)
    );
  }
}