import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ResetPassService {


  private apiUrl = 'http://localhost:8083/reset';


  constructor(private http: HttpClient) { }

  sendEmail(email: any) {
    return this.http.get<any>(this.apiUrl, {
      params: { email: email }
    });
  }



  setCode(code:any,email:any ){
    return this.http.get<any>(this.apiUrl + '/code', { params: {email: email, code: code}});
  }





}
