import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users/';
  }

  // Registro
  signIn(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}register`, user);
  }

  // Login - CORREGIDO: Cambiado de Observable<string> a Observable<any>
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}login`, user);
  }
}