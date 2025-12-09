import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:8081/user';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user, { responseType: 'text' });
  }

  existEmail(user: any){
    return this.http.post(`${this.apiUrl}/exist`,user);
  }

  checkPassword(user: any){
    return this.http.post(`${this.apiUrl}/password`,user);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }



}
