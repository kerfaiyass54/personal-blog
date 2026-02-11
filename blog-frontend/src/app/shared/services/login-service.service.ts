import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:8083/user';
  private slash: any= "/";


  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  existEmail(user: any){
    return this.http.post<any>(`${this.apiUrl}/exist`,user);
  }

  checkPassword(user: any){
    return this.http.post<any>(`${this.apiUrl}/password`,user);
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }

  changePassword(email:any, pass:any){
    return this.http.get<any>(this.apiUrl + '/change', { params: { email: email, pass: pass}});
  }



}
