import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
declare var gapi: any;
@Component({
  selector: 'app-lognbox',
  templateUrl: './lognbox.component.html',
  styleUrls: ['./lognbox.component.css']
})
export class LognboxComponent implements OnInit, AfterContentChecked {

  apiUrl = environment.apiUrl;
  gapi: any;
  loginType = 'otp';

  isValidEmail = false;

  loginButtonText = 'Get OTP';
  otpSent = this.authService.isValidEmailandOtpRerurn;
  errorMessage = '';

  googleParams: any;

  loginFormPassword = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    otp: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
  });


  public loginButtonLoaders = {
    'google': false,
    'signin': false
  };


  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.authService.getSignLoader.subscribe((status) => {
      console.log(status)
      this.loginButtonLoaders.signin = status;
    })
  }

  ngOnInit(): void { }
  ngAfterContentChecked(): void {
    // if (!this.authService.loginStatus && !this.authService.userToken) {
    setTimeout(() => {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'system',
        // 'onclick': (param: any) => this.signWithGoogle(param),
        'onsuccess': (param: any) => this.googleParams = param
        // 'onclick': (param: any) => this.googleParams = param,
        // 'onsuccess': (param: any) => this.signWithGoogle(param)
      });
    }, 3000);
    // }
  }
  async otpLogin() {
    this.authService.signInLoader.next(true);
    console.log(this.authService.isValidEmailandOtpRerurn)
    if (!this.authService.isValidEmailandOtpRerurn) {
      this.authService.signWithOTP(this.loginFormPassword.get('email')?.value);
    } else {
      // otp verific
      this.authService.verifyOTP(this.loginFormPassword.get('email')?.value, this.loginFormPassword.get('otp')?.value);
    }
  }

  // login form change
  changeLogin(type: string) {
    this.loginType = type;
  }

  signWithGoogle() {
    const googleUser = this.googleParams;
    const gUser = googleUser;
    const userGoogleData = {
      "username": gUser.getBasicProfile().getEmail(),
      "name": gUser.getBasicProfile().getName(),
      "email": gUser.getBasicProfile().getEmail(),
      "avatar": gUser.getBasicProfile().getImageUrl(),
      "type": 1,
      "social": [
        {
          "plateform": "google",
          "token": gUser.getBasicProfile().getId()
        }
      ]
    }
    console.log(userGoogleData);
    this.authService.signInWithGoogle(userGoogleData).subscribe((data: any) => {
      console.log(data)
      if (data.success == true && this.authService.setLoginStatus(true, data.token)) {

        let returnData = false;
        let userData2;
        this.http.get(`${this.apiUrl}api/user`).subscribe((userData: any) => {
          console.log(userData);
          this.authService.setUser(userData)
          userData2 = userData;
          console.log(this.authService.userProfileData);
          // if (this.authService.userProfileData.selected_category && this.authService.userProfileData.selected_category.length < 1) {
          //   this.router.navigate(['/choose-category'])
          //     .then(() => {
          //       window.location.reload();
          //     });
          //   return;
          // }
          location.reload();
        })
      }
    })

  }

}
