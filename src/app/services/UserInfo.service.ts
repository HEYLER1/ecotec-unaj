import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserInfo } from '../interfaces/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
  }

  getUsers(): Observable<UserInfo[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<UserInfo[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: headers })
  }

  getUserInfo(): Observable<UserInfo> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.get<UserInfo>(`${this.myAppUrl}${this.myApiUrl}/profile`, { headers: headers })
  }
}
