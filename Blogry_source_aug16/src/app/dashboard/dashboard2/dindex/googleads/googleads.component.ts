import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoogleAds } from 'src/app/classes/googleAds';
import { AuthService } from 'src/app/services/auth.service';
import { LoadscriptsService } from 'src/app/services/loadscripts.service';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-googleads',
  templateUrl: './googleads.component.html',
  styleUrls: ['./googleads.component.css']
})
export class GoogleadsComponent implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl;

  razorpayOptions = {
    "key": '',
    "amount": '',
    "currency": 'INR',
    "name": 'Blogry',
    "description": '',
    "order_id": '',
    "notes": {},
    "handler": (res) => {
      console.log(res)
    }
  }

  myGoogleAds: GoogleAds[];

  constructor(private http: HttpClient, private loadScript: LoadscriptsService, private auth: AuthService) { }
  ngOnInit(): void {
    this.http.get(`${this.apiUrl}api/google_advertisement`).subscribe((ads: GoogleAds[]) => {
      console.log(ads)
      this.myGoogleAds = ads;
    })
    this.loadScript.loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpay_checkout');
  }

  initRazorPay(amount: number, description: string, ad_id:string) {
    // this.razorpayOptions = formData;
    const data = {
      amount: amount*100
    }
    const userId = this.auth.userId;
    this.http.post(`${this.apiUrl}api/razorpay/payment`, data).subscribe((response: any) => {
      console.log(response);
      this.razorpayOptions.key = response['key'];
      this.razorpayOptions.amount = response['amount'];
      this.razorpayOptions.description = description;
      this.razorpayOptions.order_id = response['order_id'];
      this.razorpayOptions.notes = {
        product_name: description,
        product_id: ad_id,
        user_id: userId
      };
      this.razorpayOptions.handler = this.razorPayHandler;
      var rzp1 = new Razorpay(this.razorpayOptions);
      rzp1.open();
    })
  }

  razorPayHandler(response) {
    var data = [
      response,
      this.razorpayOptions
    ]
    console.log(data)
    location.reload();
  }





  ngOnDestroy(): void {
    this.loadScript.revomeScriptById('razorpay_checkout');
  }


}
