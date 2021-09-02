import { AfterViewInit, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BlogsService } from './frontend/service/blogs.service';
import { AuthService } from './services/auth.service';
import * as $ from 'jquery';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
// import * as jQuery from 'jquery';
// import * as jquery from 'jquery';
window['$'] = window['jQuery'] = $;
window['jQuery'] = window['jQuery'] = jQuery;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Blogry';
  message;

  origin = window.location.origin + '/';
  currentUrl = window.location.href;

  myLoader = false;
  showBanner = false;

  // generalFooter = true;

  // supportCenter = false;

  workPlace = false;
  dash = '/p/dashboard';
  ads = '/p/dashboard/blogry-ads';
  createad = '/p/dashboard/blogry-ads/create';
  adsense = '/p/dashboard/google-ads';
  createadsense = '/p/dashboard/google-ads/create';
  transactions = '/p/dashboard/transactions';
  earnings = '/p/dashboard/earnings';
  onepagewebsite = '/p/dashboard/one-page-website';

  constructor(
    private router: Router,
    public location: Location,
    private blogService: BlogsService,
    public auth: AuthService
  ) {
    router.events.subscribe((val) => {
      // console.log(val)
      if (location.path() == this.dash || location.path() == this.ads || location.path() == this.createad || location.path() == this.adsense || location.path() == this.createadsense || location.path() == this.transactions || location.path() == this.earnings || location.path() == this.onepagewebsite) {
        this.workPlace = true;
      } else {
        this.workPlace = false;
      }
      // if(location.path() == '/contact-us' || location.path() ==  '/about-us' || location.path() ==  '/p/dashboard/write') {
      //   this.generalFooter = false;
      //   // console.log('mini footer')
      // } else {
      //   this.generalFooter = true;
      //   // console.log('general footer')
      // }
    });
  }
  ngOnInit() {
    // this._messagingSrv.requestPermission();
    // this._messagingSrv.receiveMessage();
    // this.message = this._messagingSrv.currentMessage;

    // this.auth.getHomeRecentBlogs();
    if (this.homepagecheck()) {
      this.showBanner = true;
    }
    if (this.auth.loginStatus && this.auth.userToken) {
      this.auth.setUserData().then(() => {
        // console.log(this.auth.userToken);
      })
    }

    this.auth.mainLoader.asObservable().subscribe((status) => {
      this.myLoader = status;
    })

    this.blogService.getCategories();
  }

  homepagecheck() {
    var check = false;
    if (document.location.pathname === "/") {
      check = true;
    }
    return check;
  }
  ngAfterViewInit() {
  }
}
