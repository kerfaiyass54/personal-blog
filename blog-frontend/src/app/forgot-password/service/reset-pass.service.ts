import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ResetPassService {


  private apiUrl = 'http://localhost:8083/reset/';


  constructor(private http: HttpClient) { }

  sendEmail(email: any) {
    return this.http.get<any>(this.apiUrl + email);
  }


  setCode(request:any){
    return this.http.post<any>(this.apiUrl + 'code', request);
  }





}
