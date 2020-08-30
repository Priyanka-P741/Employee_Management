import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {

  private  _profileEditUrl ="/update"
  items:any = {};
  Key:string ="t";
  token:string;

  constructor(private _http:HttpClient,public storage: Storage) { }
  ngOnInit() {
  
    this.getToken();
  }

  onUploadproduct(empId:string,
    name:string,
    images:File,
    email:string,
    dob:Date,
    designation:string,
    hardware:string,
    address:string,
    manager:string,
    phone_no:number,
    device_id:string){
     var formdata :any= new FormData();
     formdata.append('empId',empId),
     formdata.append('name',name),
     formdata.append('image',images),
     formdata.append('email',email),
     formdata.append('dob',dob),
     formdata.append('designation',designation),
     formdata.append('hardware',hardware),
     formdata.append('address',address),
     formdata.append('manager',manager),
     formdata.append('phone_no',phone_no),
     formdata.append('device_id',device_id)
     const headers = new HttpHeaders()
     //.append('Content-Type', 'application/json')
     .append('Access-Control-Allow-Headers', '*')
     .append('Authorization',	this.token)
     .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
     .append('Access-Control-Allow-Origin', '*');
          
    //  console.log('data to send: ',prodImages);
   return this._http.put(this._profileEditUrl, formdata,{headers});

}

getToken(){
  this.storage.get(this.Key).then((val)=>{
    if(val!=null && val!=undefined){
      this.items =JSON.parse(val);
      this.token =this.items.token;
      //console.log(this.token);
    }
  })
}
}
