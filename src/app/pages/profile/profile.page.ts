import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders,HttpRequest,HttpParams} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  items:any = {};
  key:string ='items';
  
  Key:string ="t";
  mytoken:any = {};
  
    empId: string;
    name: string;
    email: string;
    dob: string;
    image: string;
    address: string;
    manager: string;
    phone_no: Number;
    device_id: string;
    joining_date:any;
    designation:string;
    hardware:string;

    token:string;
//private _getUserUrl ="/profile/{{this.empId}}"
  constructor(public alertController: AlertController,public storage:Storage,public httpClient:HttpClient,private router: Router) { }
  
  editcall(){
    console.log("testing");
    this.router.navigate(['/profile-edit']);
    
  }
  ngOnInit() {
   this.getToken();
   this.getData();
  //this.getUser();
  }



  

getData(){
  this.storage.get(this.key).then((val)=>{
    if(val!=null && val!=undefined){
      this.items =JSON.parse(val);
      //console.log(this.items.data.name);
      this.name =this.items.data.name;
      //this.empId =this.items.data.empId;
      this.email =this.items.data.email;
      this.dob =this.items.data.dob;
      this.designation =this.items.data.designation;
      this.image =this.items.data.profile_pic;
      this.address =this.items.data.address;
      this.manager =this.items.data.manager;
      this.phone_no =this.items.data.phone_no;
      this.device_id =this.items.data.device_id;
      this.joining_date= this.items.data.joining_date;
      this.hardware= this.items.data.hardware;
      this.token=this.items.token;
    }
  })
}

getToken(){
  this.storage.get(this.Key).then((val)=>{
    if(val!=null && val!=undefined){
      this.mytoken =JSON.parse(val);
      this.token =this.mytoken.token;
      this.empId = this.mytoken.data.empId;
      //console.log(this.token);
    }
  })
}




// getUser() {
    

//   const headers = new HttpHeaders()
//   .append('Content-Type', 'application/json')
//   .append('Authorization',	this.token)
//   .append('Access-Control-Allow-Headers', '*')
//   .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
//   .append('Access-Control-Allow-Origin', '*');
//   //let params1 = new HttpParams().set('empId',this.empId);
//   this.httpClient.get(this._getUserUrl,{headers} )
//     .subscribe(data => {
//       console.log(data);
//       this.items = data;
//         this.storage.set(this.key,JSON.stringify(this.items));
//         if(!this.items.error){
//           this.alert();
//           this.getData();
//         }else{
//           this.alertError();
//         }        
//      }, error => {
//       console.log(error);
//     });
// }
// async alert(){
//   const alert = await this.alertController.create({
//     header: 'Update Profile',
//     message: 'Successfully updated profile.',
//     buttons: [{
//       text: 'Ok',
//           handler: () => {
//             this.router.navigate(['profile']);
//           }
//     }]
//   });
//   await alert.present();
// }

// async alertError(){
//   const alert = await this.alertController.create({
//     header: 'Unseccessfull',
//     message: this.items.message,
//     buttons: [{
//       text: 'Ok',
//           handler: () => {
//             this.router.navigate(['profile-edit']);
//           }
//     }]
//   });
//   await alert.present();
// }

}
