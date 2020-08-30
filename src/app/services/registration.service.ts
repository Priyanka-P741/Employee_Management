import { Injectable, Input } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private _registerUrl ="/employees"


  constructor(private _http:HttpClient,public storage: Storage) { }

  
  onUploadproduct(name:string,
      images:File,
      email:string,
      dob:Date,
      address:string,
      manager:string,
      phone_no:number,
      device_id:string){
       var formdata :any= new FormData();
       formdata.append('name',name),
       formdata.append('image',images),
       formdata.append('email',email),
       formdata.append('dob',dob),
       formdata.append('address',address),
       formdata.append('manager',manager),
       formdata.append('phone_no',phone_no),
       formdata.append('device_id',device_id)
       const headers = new HttpHeaders()
       //.append('Content-Type', 'application/json')
       .append('Access-Control-Allow-Headers', '*')
       .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
       .append('Access-Control-Allow-Origin', '*');
            
      //  console.log('data to send: ',prodImages);
     return this._http.post(this._registerUrl, formdata,{headers});
  
 }
}
