import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private _registerUrl ="/employees"
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
     'image' : [
      { type : 'required' , message: 'Profile Picture is required.' },
     ],
     'address' : [
      { type : 'required' , message: 'Address is required.' },
     ],
     'manager' : [
      { type : 'required' , message: 'manager is required.' },
     ],
     'phone_no' : [
      { type : 'required' , message: 'Mobile Number is required.' },
      { type : 'pattern' , message: 'Mobile Number must have 10 digit' }

     ],
     'device_id' : [
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

  constructor(private router: Router,private alertController:AlertController,public registrationService:RegistrationService,
  public httpClient:HttpClient,private formsBuilder : FormBuilder ) {
    this.myForm = formsBuilder.group({
      name:['', [Validators.required]],
      email:['', [Validators.compose([
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
      ])]],
      dob:['', [Validators.required]],
      image:['', [Validators.required]],
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
  
  onFileSelected(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({
      image:file
    });
    this.myForm.get('image').updateValueAndValidity()  
    console.log('gtdyuetwhuwierhie',file);
      
  } 

  
       
   
//// Extra Code By Ashish
   

// onUploadproduct(producttitle:string,
//   prodImages:File,
//   desc:string,
//   price:string){
//    var formdata :any= new FormData();
//    formdata.append('producttitle',producttitle),
//    formdata.append('prodImage',prodImages),
//    formdata.append('desc',desc),
//    formdata.append('price',price)
//   //  console.log('data to send: ',prodImages);
//      return  this.http.post(this._url,formdata,{
//     reportProgress:true,
//     observe:'events'
//   }).pipe(
//     catchError(this.errorMgmt)
//   )
//  }
//  errorMgmt(error: HttpErrorResponse) {
//   let errorMessage = '';
//   if (error.error instanceof ErrorEvent) {
//     // Get client-side error
//     errorMessage = error.error.message;
//   } else {
//     // Get server-side error
//     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//   }
//   console.log(errorMessage);
//   return throwError(errorMessage);
// }
// }



// onSubmitAddProductform(){
//   // console.log(this.AddProduct.value);
//   this.addProductService.onUploadproduct(
//   this.AddProduct.value.producttitle,
//   this.AddProduct.value.prodImage,
//   this.AddProduct.value.desc,
//   this.AddProduct.value.price,
//   ).subscribe((event: HttpEvent<any>) => {
//     switch (event.type) {
//       case HttpEventType.Sent:
//         console.log('Request has been made!');
//         break;
//       case HttpEventType.ResponseHeader:
//         console.log('Response header has been received!');
//         break;
//       case HttpEventType.UploadProgress:
//         this.progress = Math.round(event.loaded / event.total * 100);
//         console.log(`Uploaded! ${this.progress}%`);
//         break;
//       case HttpEventType.Response:
//         console.log('User successfully created!', event.body);
//         setTimeout(() => {
//           this.progress = 0;
//         }, 1500);

//     }
//   this.AddProduct.reset();

//   })
  

// }


//End
sendPostRequest() {

this.registrationService.onUploadproduct(
    this.myForm.value.name,
    this.myForm.value.image,
    this.myForm.value.email,
    this.myForm.value.dob,
    this.myForm.value.address,
    this.myForm.value.manager,
    this.myForm.value.phone_no,
    this.myForm.value.device_id,

    ).subscribe(data => {
        console.log(data);
        this.items = data;
        if(!this.items.error){
        this.alert();
        }else{
        this.alertError();
        }
        }, error => {
        console.log(error);
      });

}
async alert(){
  const alert = await this.alertController.create({
    header: 'successfull',
    message: 'User Registration Complete ',
    buttons: [{
      text: 'Ok',
          handler: () => {
            this.router.navigate(['/user-home']);
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
            this.router.navigate(['register']);
          }
    }]
  });
  await alert.present();
}


}
