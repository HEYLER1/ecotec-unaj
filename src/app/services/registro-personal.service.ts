// services/registro-personal.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroPersonalService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/registros-personal'; // ✅ CORREGIDO: registros-personal (plural)
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  /**
   * Crear un nuevo registro de personal
   */
  crearRegistro(data: any): Observable<any> {
    return this.http.post<ApiResponse<any>>(
      `${this.myAppUrl}${this.myApiUrl}`,
      data,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtener todos los registros del usuario autenticado
   */
  getRegistros(): Observable<any[]> {
    return this.http.get<ApiResponse<any[]>>(
      `${this.myAppUrl}${this.myApiUrl}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtener un registro específico por ID
   */
  getRegistroById(id: number): Observable<any> {
    return this.http.get<ApiResponse<any>>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Actualizar un registro existente
   */
  actualizarRegistro(id: number, data: any): Observable<any> {
    return this.http.put<ApiResponse<any>>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      data,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Eliminar un registro (soft delete)
   */
  eliminarRegistro(id: number): Observable<any> {
    return this.http.delete<ApiResponse<any>>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data)
    );
  }
}