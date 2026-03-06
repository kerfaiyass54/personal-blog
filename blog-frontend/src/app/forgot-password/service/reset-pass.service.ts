import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPassService {

  private apiUrl = 'http://localhost:8083/reset';

  constructor(private http: HttpClient) {}

  // GET /reset?email=...
  sendEmail(email: any): Observable<void> {
    return this.http.get<void>(this.apiUrl, {
      params: { email: email }
    });
  }

  // GET /reset/code?code=...&email=...
  setCode(code: any, email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/code`, {
      params: { code: code, email: email }
    });
  }

}
