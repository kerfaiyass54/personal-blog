import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsManagementService {

  private apiUrl = 'http://localhost:8083/sessions';

  constructor(private http: HttpClient) {}

  // POST /sessions/
  addSession(session: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, session);
  }

  // GET /sessions/list/{email}
  getAllSessions(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list/${email}`);
  }

  // PATCH /sessions/?id=...&isMe=...
  setIsItMe(id: string, isMe: boolean): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/?id=${id}&isMe=${isMe}`, {});
  }

  // PATCH /sessions/alert?email=...&time=...
  setAlert(email: string, time: any): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/alert?email=${email}&time=${time}`, {});
  }

  // GET /sessions/{id}
  getSession(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // GET /sessions/alerts/{email}
  getAlerts(email: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/alerts/${email}`);
  }

  // GET /sessions/?time=...
  getSessionByTime(time: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?time=${time}`);
  }

}
