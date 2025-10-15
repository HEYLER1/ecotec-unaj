// services/sede.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs'; // ✅ IMPORTAR 'of'
import { environment } from '../../environments/environment';
import { Sede } from '../interfaces/sede';

// ✅ Interface para la respuesta del backend
interface SedeResponse {
  success: boolean;
  data: Sede[];
}

// ✅ DATOS DE PRUEBA (TOMADOS DE forms-student.ts)
const MOCK_SEDES: Sede[] = [
  { id_sede: 11, nombre: 'SEDE CAPILLA - ADMINISTRATIVO', imagen: 'capilla.jpg', estado :1},
  { id_sede: 21, nombre: 'SEDE AYABACAS', imagen: 'ayabacas.jpg', estado : 1 },
  { id_sede: 31, nombre: 'SEDE CAPILLA - ACADÉMICO', imagen: 'sede.jpg', estado: 1 },
  { id_sede: 41, nombre: 'SEDE SANTA CATALINA', imagen: 'sede.jpg', estado: 1 }
];

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
    // --- INICIO DEL TRUCO ---
    console.warn('Devolviendo datos MOCK para las sedes. No olvides quitar esto en producción.');
    return of(MOCK_SEDES);
    // --- FIN DEL TRUCO ---

    /*
    // CÓDIGO ORIGINAL COMENTADO
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<SedeResponse>(`${this.myAppUrl}${this.myApiUrl}`, { headers })
      .pipe(
        map(response => response.data)
      );
    */
  }

  getSedeById(id: number): Observable<Sede> {
    // Devolvemos la sede desde el mock para que la navegación funcione
    const sede = MOCK_SEDES.find(s => s.id_sede === id);
    return of(sede!);

    /*
    // CÓDIGO ORIGINAL COMENTADO
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Sede>(`${this.myAppUrl}${this.myApiUrl}/${id}`, { headers });
    */
  }
}