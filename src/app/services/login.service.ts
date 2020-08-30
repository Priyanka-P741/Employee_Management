import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private  _loginUrl ="/login"

  constructor(private httpClient:HttpClient) { }

  loginPost(
        empId:string,
         password:string,
         device_id:string){
      var formdata :any= new FormData();
      formdata.append('empId',empId),
      formdata.append('password',password),
      formdata.append('device_id',device_id)
      console.log(formdata.empId);

    const headers = new HttpHeaders()
       //.append('Content-Type', 'application/json')
       .append('Access-Control-Allow-Headers', '*')
       .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
       .append('Access-Control-Allow-Origin', '*');
      return this.httpClient.post(this._loginUrl,formdata,{headers} )

  }
}
