import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-defaulter-checkout',
  templateUrl: './defaulter-checkout.page.html',
  styleUrls: ['./defaulter-checkout.page.scss'],
})
export class DefaulterCheckoutPage implements OnInit {

private _checkoutUrl ="/check-out"

//get items from localstorage items
items:any = {};
key:string ='items';
token:string;
empId:string;
//set checkinItems from localstorage checkinItems
checkinItems:any = [];
nextKey:string ='checkinItems';

d: Date = new Date();

  myForm: FormGroup;

  constructor(private router: Router,private alertCtrl: AlertController,private formsBuilder : FormBuilder,public httpClient:HttpClient,public storage:Storage) { 
    this.myForm = formsBuilder.group({
    'earlyOutReason':['', Validators.compose([Validators.maxLength(50), Validators.minLength(20), Validators.required])],
  }); 
}
onSubmit(){
  console.log(this.myForm.value);
}
  ngOnInit() {
    this.getData();
    this.d;
  }

  sendPutRequest(){
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization',	this.token)
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', "GET, POST, DELETE, PUT")
      .append('Access-Control-Allow-Origin', '*');
      
      let inputs = {
        "outTime":this.d,
        "empId":this.empId,
        "earlyOutReason":this.myForm.value.earlyOutReason

      }
      this.httpClient.put(this._checkoutUrl,inputs,{headers} )
        .subscribe(data => {
          console.log(data);
          this.checkinItems = data;
            this.storage.set(this.nextKey,JSON.stringify(this.checkinItems));
            if(!this.checkinItems.error){
              this.router.navigate(['user-home'])
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
        this.token =this.items.token;
        this.empId =this.items.data.empId;
      }
    })
  }

  async alert(){
    const alert = await this.alertCtrl.create({
      header: 'successfull',
      message: 'check out successfully',
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
      message: this.checkinItems.message,
      buttons: [{
        text: 'Ok',
            handler: () => {
              this.router.navigate(['defaulter-checkout']);
            }
      }]
    });
    await alert.present();
  }
}
