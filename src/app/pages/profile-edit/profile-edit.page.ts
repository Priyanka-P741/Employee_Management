import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  items:any = {};
  key:string ='items';
  Key:string ="t";
  mytoken:any = {};

  empId: string;
    name: string;
    email: string;
    dob: any;
    profile_pic: string;
    address: string;
    manager: string;
    phone_no: Number;
    device_id: string;
    joining_date:any;
    designation:string;
    hardware:string;

    token:string;

  
  private  _profileEditUrl =""
    
myForm: FormGroup;

  constructor(public alertController: AlertController,public storage:Storage,public httpClient:HttpClient, private router: Router, private formsBuilder : FormBuilder) {
    this.myForm = formsBuilder.group({
      empId: new FormControl(''),
      name: new FormControl(''),
      designation: new FormControl(''),
      manager: new FormControl(''),
      hardware: new FormControl(''),
      email: new FormControl(''),
      pic: new FormControl(''),
      addr: new FormControl(''),
      phone_no: new FormControl(''),
      dob: new FormControl('')
    });
   }

  

  onSubmit() {
    console.log(this.myForm.value.touched);
  }
  ngOnInit() {
  
    this.getToken();
    this.getData();

  }

  sendPutRequest() {
    
    
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization',	this.token)
    .append('Access-Control-Allow-Headers', '*')
    .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
    .append('Access-Control-Allow-Origin', '*');

    this.httpClient.put(this._profileEditUrl,JSON.stringify(this.myForm.value),{headers} )
      .subscribe(data => {
        console.log(data);
        this.items = data;
          if(!this.items.error){
            this.alert();
          this.storage.set(this.key,JSON.stringify(this.items));
          }else{
            this.alertError();
          }        
       }, error => {
        console.log(error);
      });
}
  getData(){
    this.storage.get(this.key).then((val)=>{
      if(val!=null && val!=undefined){
        this.items =JSON.parse(val);
        
        this.name =this.items.data.name;
        this.empId =this.items.data.empId;
        this.email =this.items.data.email;
        this.dob =this.items.data.dob;
        this.profile_pic =this.items.data.profile_pic;
        this.address =this.items.data.address;
        this.manager =this.items.data.manager;
        this.phone_no =this.items.data.phone_no;
        this.device_id =this.items.data.device_id;
        this.joining_date= this.items.data.joining_date;
        this.designation= this.items.data.designation;
        this.hardware= this.items.data.hardware;
        //this.token =this.items.token;

      }
    })
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
  async alert(){
    const alert = await this.alertController.create({
      header: 'Update Profile',
      message: 'Successfully updated profile.',
      buttons: [{
        text: 'Ok',
            handler: () => {
              this.router.navigate(['profile']);
            }
      }]
    });
    await alert.present();
  }
  
  async alertError(){
    const alert = await this.alertController.create({
      header: 'Unseccessfull',
      message: this.items.message,
      buttons: [{
        text: 'Ok',
            handler: () => {
              this.router.navigate(['profile-edit']);
            }
      }]
    });
    await alert.present();
  }

}
