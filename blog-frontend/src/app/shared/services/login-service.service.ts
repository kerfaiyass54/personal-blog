import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private api = 'http://localhost:8080/user/';

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLogged() {
    return !!this.getToken();
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    const payload = JSON.parse(atob(token.split('.')[1]));
    return [payload.roles];
  }

  login(user: any){
    return this.http.post<any>(`${this.api}login`, user).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  register(user: any){
    return this.http.post<any>(`${this.api}signup`, user);
  }
}
