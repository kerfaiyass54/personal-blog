import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:8083/user';

  constructor(private http: HttpClient) {}

  // POST /user/register
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  getUsername(email: any): Observable<string> {
    return this.http.get(
      `${this.apiUrl}/username`,
      { params: { email }, responseType: 'text' }
    );
  }

  // POST /user/login
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // GET /user/email?emailToTest=...
  existEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/email`, {
      params: { emailToTest: email }
    });
  }

  // GET /user/?emailLogin=...&password=...
  checkPassword(email: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/`, {
      params: { emailLogin: email, password: password }
    });
  }

  // PATCH /user/?email=...&newPass=...
  changePassword(email: any, newPass: any): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/`, {}, {
      params: { email: email, newPass: newPass }
    });
  }

  // ---------------- TOKEN MANAGEMENT ----------------

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('email');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
