// services/registro-estudiante.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegistroEstudiante } from '../interfaces/registro-estudiante';
@Injectable({
  providedIn: 'root'
})
export class RegistroEstudianteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/registros-estudiante/';
  }

  // Crear registro de estudiante
  createRegistro(registro: RegistroEstudiante): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, registro);
  }
}