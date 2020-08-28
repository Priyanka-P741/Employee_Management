import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-defaulter-reason',
  templateUrl: './defaulter-reason.page.html',
  styleUrls: ['./defaulter-reason.page.scss'],
})
export class DefaulterReasonPage implements OnInit {

  private _checkinUrl =""
  //get items from localstorage items
  items:any = {};
  key:string ='items';
  token:string;
  empId:string;
 //set checkinItems from localstorage checkinItems
 checkinItems:any = [];
  nextKey:string ='checkinItems';
  
  d: Date = new Date();
  latitude:number;
  longitude:number;
  
 
   myForm: FormGroup;

  constructor(private router: Router,private geolocation: Geolocation,private alertCtrl: AlertController,private formsBuilder : FormBuilder,public httpClient:HttpClient,public storage:Storage) { 
    this.myForm = formsBuilder.group({
    'reason':['', Validators.compose([Validators.maxLength(50), Validators.minLength(20), Validators.required])],
  }); 
}
onSubmit(){
  console.log(this.myForm.value);
}

loadMap() {
  this.geolocation.getCurrentPosition().then((resp) => {

    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    console.log(this.latitude);
    console.log(this.longitude);

  })
}
  ngOnInit() {
    this.getData();
    console.log(this.d);
    this.loadMap();
  }


  sendPostRequest() {
    //this.router.navigate(['login']);
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization',	this.token)
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
    .append('Access-Control-Allow-Origin', '*');
    
    let inputs = {
      "inTime":this.d,
      "lat":this.latitude,
      "lon":this.longitude,
      "empId":this.empId,
      "lateInReason":this.myForm.value.reason
    }
    this.httpClient.post(this._checkinUrl,{inputs},{headers} )
      .subscribe(data => {
        console.log(data);
        this.checkinItems = data;
          this.storage.set(this.nextKey,JSON.stringify(this.checkinItems));
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
      console.log(this.items.data.empId);
      console.log(this.items.token);

      this.token =this.items.token;
      this.empId =this.items.data.empId;

    }
  })
}
async alert(){
  const alert = await this.alertCtrl.create({
    header: 'successfull',
    message: this.items.message,
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
  const alert = await this.alertCtrl.create({
    header: 'Unseccessfull',
    message: this.items.message,
    buttons: [{
      text: 'Ok',
          handler: () => {
            this.router.navigate(['defaulter-reason']);
          }
    }]
  });
  await alert.present();
}

}
