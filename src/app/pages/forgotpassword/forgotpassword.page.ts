import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './password.validator';
import { AbstractControl } from '@angular/forms';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  items:any = {};
  key:string ='items';
  token:string;

  validation_messages = {
    'empId' : [
     { type : 'required' , message: 'EmpId is required.' },
    ],
    'oldpassword' : [
      { type : 'required' , message: 'Password is required.' },
     ],
     'password' : [
      { type : 'required' , message: 'Password is required.' },
     ],
     'confirmPassword' : [
      { type : 'required' , message: 'Password is required.' },
     ],     
  }

myForm: FormGroup;
passwordType: string ="password";
passwordShown: boolean = false;
_updatePasswordUrl ="/password-update"

  constructor(public alertController: AlertController,public storage:Storage,public httpClient:HttpClient, private router: Router, private formsBuilder : FormBuilder) { }

  onSubmit() {
    console.log(this.myForm.value);
  }

  
public togglePassword(){
  if(this.passwordShown){
    this.passwordShown = false;
    this.passwordType ='password';
  } else {
    this.passwordShown = true;
    this.passwordType ='text';
  }
}



  ngOnInit() {
    this.myForm = this.formsBuilder.group({
      empId:['', [Validators.required]],
      oldpassword:['', [Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]

    },{ validators: this.Password.bind(this) });

    this.getData();
  }
  Password(formGroup:FormGroup) {
    const { value:password } = formGroup.get('password');
    const { value:confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : {passwordNotMatch:true};

  }

  sendPutRequest() {
    
    
    
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization',	this.token)
    .append('Access-Control-Allow-Headers', '*')
    .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
    .append('Access-Control-Allow-Origin', '*');

    this.httpClient.put(this._updatePasswordUrl,JSON.stringify(this.myForm.value),{headers} )
      .subscribe(data => {
        console.log(data);
        this.items = data;
          this.storage.set(this.key,JSON.stringify(this.items));
          if(!this.items.error){
            this.alert();
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
      //console.log(this.items.token);
      this.token =this.items.token;
      
    }
  })
}

async alert(){
  const alert = await this.alertController.create({
    header: 'Update Password',
    message: 'Successfully changed password.',
    buttons: [{
      text: 'Ok',
          handler: () => {
            this.router.navigate(['/login']);
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
            this.router.navigate(['forgotpassword']);
          }
    }]
  });
  await alert.present();
}

  }


