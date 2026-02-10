import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class SessionsManagementService {

  private apiUrl = 'http://localhost:8083/sessions/';

  constructor(private http: HttpClient) { }

  addSession(session: any){
    return this.http.post<any>(`${this.apiUrl}`, session);
  }

  getAllSessions(email:any){
    return this.http.get<any[]>(this.apiUrl + "list/" + email);
  }

  setIsItMe(id: any, isMe: any){
    return this.http.get<any>(this.apiUrl + "isMe/" + id + "/" + isMe);
  }

  setAlert(email:any, time: any){
    return this.http.get<any>(this.apiUrl + "activity/" + email +"/" + time);
  }

  getSessionByTime(time: any){
    return this.http.get<any>(this.apiUrl + "activity/" + time);
  }


  getSession(id: any){
    return this.http.get<any>(this.apiUrl + "session/" + id);
  }







}
