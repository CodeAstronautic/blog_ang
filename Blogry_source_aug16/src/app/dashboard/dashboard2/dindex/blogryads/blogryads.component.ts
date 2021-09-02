import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SimpleAds } from 'src/app/classes/simpleAds';
import { AuthService } from 'src/app/services/auth.service';
import { LoadscriptsService } from 'src/app/services/loadscripts.service';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-blogryads',
  templateUrl: './blogryads.component.html',
  styleUrls: ['./blogryads.component.css']
})
export class BlogryadsComponent implements OnInit, OnDestroy {

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

  mySimpleAds: SimpleAds[];

  constructor(private http: HttpClient, private loadScript: LoadscriptsService, private auth: AuthService) { }

  ngOnInit(): void {
    this.http.get(`${this.apiUrl}api/advertisement`).subscribe((ads: SimpleAds[])=>{
      console.log(ads)
      this.mySimpleAds = ads;
    })
    this.loadScript.loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpay_checkout');
  }

  initRazorPay(amount: number, description: string, ad_id:string) {
    // this.razorpayOptions = formData;
    // var amountFull = (amount + ((amount / 100) * 10))*100
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
        product_name: 'Ads',
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
