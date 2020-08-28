import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private _registerUrl =""
  items:any ={};
  myForm: FormGroup;

  validation_messages = {
    'name' : [
     { type : 'required' , message: 'Name is required.' },
    ],
    'email' : [
      { type : 'required' , message: 'Email is required.' },
      { type : 'pattern' , message: 'Please enter a valid email.' }
     ],
     'dob' : [
      { type : 'required' , message: 'Date of Birth is required.' },
     ],
     'profile_pic' : [
      { type : 'required' , message: 'Profile Picture is required.' },
     ],
     'address' : [
      { type : 'required' , message: 'Address is required.' },
     ],
     'manager' : [
      { type : 'required' , message: 'City is required.' },
     ],
     'phone_no' : [
      { type : 'required' , message: 'Mobile Number is required.' },
      { type : 'pattern' , message: 'Mobile Number must have 10 digit' }

     ],
     'device_id' : [
      { type : 'required' , message: 'State is required.' },
     ]

  }

  onSubmit() {
    console.log(this.myForm.value);
  }

  btnClicked(){
    // // alert('btn clicked')
    // this.router.navigate(['main-page']);
  }

  constructor(private router: Router,public httpClient:HttpClient,private formsBuilder : FormBuilder ) {
    this.myForm = formsBuilder.group({
      name:['', [Validators.required]],
      email:['', [Validators.compose([
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
      ])]],
      dob:['', [Validators.required]],
      profile_pic:['', [Validators.required]],
      address:['', [Validators.required]],
      manager:['', [Validators.required]],
      phone_no:['',[Validators.compose ([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')])
      ]],
      device_id:['', [Validators.required]]

    });
   }

  ngOnInit() {
  }
  sendPostRequest() {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
    .append('Access-Control-Allow-Origin', '*');

    this.httpClient.post(this._registerUrl,JSON.stringify(this.myForm.value),{headers} )
      .subscribe(data => {
        console.log(data);
        this.items = data;
        if(!this.items.error){
          this.router.navigate(['login']);
        }
        }, error => {
        console.log(error);
      });




}
}
