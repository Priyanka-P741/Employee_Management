import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  items:any = [];
  key:string ='items';
  myForm: FormGroup;
  Key:string ="t";
  mytoken:any = [];
  token:any;

  d: Date = new Date();
  h = this.d.getHours();
  m = this.d.getMinutes();
  t = "" + this.h + this.m;
  time= Number(this.t);
  _loginUrl =""
    

  validation_messages = {
    'empId' : [
     { type : 'required' , message: 'EmpId is required.' },
     //{ type : 'pattern' , message: 'Please enter a valid email.' }
    ],
    'password' : [
      { type : 'required' , message: 'Password is required.' },
     ],
     'device_id': [
      { type : 'required' , message: 'device_id is required.' },
     ]
  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  btnClicked(){
    // // alert('btn clicked')
    // this.router.navigate(['main-page']);
  }  

  constructor(private router: Router,public alertController: AlertController,public storage:Storage,public httpClient:HttpClient,private formsBuilder : FormBuilder) {
    this.myForm = formsBuilder.group({
      empId:['', [Validators.required]],
      password:['', [Validators.required]],
      device_id:['', [Validators.required]]
    });
  }  

  ngOnInit() {}

  sendPostRequest() {
    
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
    .append('Access-Control-Allow-Origin', '*');

    this.httpClient.post(this._loginUrl,JSON.stringify(this.myForm.value),{headers} )
      .subscribe(data => {
        console.log(data);
        this.items = data;
        this.mytoken = data;
        this.storage.set(this.key,JSON.stringify(this.items));
        this.storage.set(this.Key,JSON.stringify(this.mytoken));
        if(!this.items.error){
          if(this.items.data.isnewUser){
            this.router.navigate(['forgotpassword']);
          }else{
            this.router.navigate(['user-home']);
          }
        }else{
          this.alert();
        }
       }, error => {
        console.log(error);
      });
     
}

async alert(){
  const alert = await this.alertController.create({
    header: 'Unseccessfull Login',
    message: this.items.message,
    buttons: [{
      text: 'Ok',
          handler: () => {
            this.router.navigate(['/login']);
          }
    }]
  });
  await alert.present();
}

}
