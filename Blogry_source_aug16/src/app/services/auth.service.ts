import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserClass } from '../classes/userClass';
import { AngularFireAuth } from "@angular/fire/auth";
import { Post } from '../classes/post';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  initialLengthOfHomeBlogs = 20;
  public mainLoader = new BehaviorSubject<boolean>(false);
  public apiUrl = `${environment.apiUrl}`;
  public homeBlogs = new BehaviorSubject<any[]>(null);
  // private handleError: HandleError;
  public defaultUserAvatar = '../../assets/img/defaults/defaultAvatar.png';

  public isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');
  public userToken = localStorage.getItem('userToken') || 'false';
  public userProfileData: any;

  public isLoggedInX = new BehaviorSubject<string>(localStorage.getItem('isLoggedIn') || 'false');
  public userTokenX = new BehaviorSubject<string>(localStorage.getItem('userToken') || 'false');
  public userProfile = new BehaviorSubject<UserClass>(new UserClass);

  // httpOptions = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accepts': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // };

  // httpOptionsAuthorized = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Accepts': 'application/json',
  //     'Authorization': this.userToken
  //   }
  // };

  errorMessage = '';

  email = false;
  password = false;

  isValidEmailandOtpRerurn = false;
  loginButtonText = 'Get OTP';

  showLogin = new BehaviorSubject<boolean>(true);

  header = new HttpHeaders();

  signInLoader = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    console.log(this.loginStatus);

  }

  public setUser(userData: any) {
    this.userProfileData = userData;
    this.userProfile.next(userData);
  }

  get userId() {
    return this.userProfile.subscribe((user) => {
      return user._id;
    })
  }

  get getSignLoader() {
    return this.signInLoader.asObservable();
  }

  // start google
  signInWithGoogle(payload: any) {
    this.header.set('Access-Control-Allow-Origin', '*');
    this.header.set('Content-Type', 'application/json');
    this.header.set('Accepts', 'application/json');
    return this.http.post(`${this.apiUrl}api/signup`, payload);
  }
  // ends google

  hideLoginForm() {
    this.showLogin.next(false);
  }
  get getLoginFormStatus() {
    return this.showLogin.asObservable();
  }

  signWithPhoneOtp(phoneNumber, appVerifier) {
    this.afAuth.signInWithPhoneNumber(phoneNumber, appVerifier).then((response) => {
      console.log(response)
    })
  }

  signWithOTP(email: string) {
    this.signInLoader.next(true);
    this.header.set('Access-Control-Allow-Origin', '*');
    this.header.set('Content-Type', 'application/json');
    this.header.set('Accepts', 'application/json');
    const data = {
      "email": email,
      "type": 2
    }
    // const body=JSON.stringify(data);
    this.http.post(`${this.apiUrl}api/signin`, data).subscribe((data: any) => {
      if (data.success) {
        this.isValidEmailandOtpRerurn = true;
        this.loginButtonText = 'Verify OTP';
        console.log('success')
      } else {
        this.isValidEmailandOtpRerurn = false;
        this.loginButtonText = 'Get OTP';
        console.log('false')
      }
    })
    this.signInLoader.next(false);
    // setTimeout(() => {
    //   this.signInLoader.next(false);
    // }, 5000);
  }
  signUpWithOTP(payload: any) {
    this.header.set('Access-Control-Allow-Origin', '*');
    this.header.set('Content-Type', 'application/json');
    this.header.set('Accepts', 'application/json');
    return this.http.post(`${this.apiUrl}api/signup`, payload);
  }
  verifyOTP(email: string, otp: number) {
    this.signInLoader.next(true);
    this.header.set('Access-Control-Allow-Origin', '*');
    this.header.set('Content-Type', 'application/json');
    this.header.set('Accepts', 'application/json');
    const data = {
      "email": email,
      "otp": otp
    }
    // const body=JSON.stringify(data);
    this.http.post(`${this.apiUrl}api/verify_otp`, data).subscribe(async (data: any) => {
      if (data.success) {
        if (this.setLoginStatus(true, data.token)) {
          this.setUserData();
          setTimeout(() => {
            console.log(this.userProfileData);
            if (this.userProfileData.selected_category.length < 1) {
              this.router.navigate(['/choose-category'])
                .then(() => {
                  window.location.reload();
                  this.signInLoader.next(false);
                });
              return;
            }
            this.signInLoader.next(false);
            location.reload();
          }, 2000);
        }
        console.log('success');
        // location.reload();
      } else {
        this.setLoginStatus(false, 'false');
        this.isValidEmailandOtpRerurn = false;
        this.loginButtonText = 'Get OTP';
        console.log('false');
        this.signInLoader.next(false);
      }
    })
  }

  async setUserData() {
    let returnData = false;
    let userData2;
    const accessToken = localStorage.getItem('userToken');
    this.http.get(`${this.apiUrl}api/user`).subscribe((userData: any) => {
      console.log('userData');
      console.log(userData);
      this.userProfileData = userData;
      this.userProfile.next(userData);
      userData2 = userData;
      // if(userData.selected_category.length < 1) {
      //   this.router.navigate(['/choose-category']);
      //   returnData = true;
      // }
    })
    return true;
  }
  setLoginStatus(status: boolean, token: string) {
    this.isLoggedIn = status;
    this.userToken = token;
    localStorage.setItem('isLoggedIn', this.isLoggedIn);
    localStorage.setItem('userToken', this.userToken);
    this.isLoggedInX.next(this.isLoggedIn);
    this.userTokenX.next(token);
    return true;
  }

  get currentUser() {
    return this.userProfile.asObservable();
  }

  get loginStatus() {
    if (!this.isLoggedIn || this.userToken == 'false') {
      return false;
    }
    return this.isLoggedIn;
  }

  get behavioralLoginStatus() {
    return this.isLoggedInX.asObservable();
  }
  userLogOut() {
    this.isLoggedIn = 'false';
    localStorage.setItem('isLoggedIn', this.isLoggedIn);
    localStorage.clear();
    location.reload();
  }


  saveUserCategories(payload: any) {
    this.http.post<any>(`${this.apiUrl}api/category`, payload).subscribe((response) => {
      if(response.success) {
        this.getHomeRecentBlogs(this.initialLengthOfHomeBlogs);
      }
      console.log(response);
      // this.setUserData().then(() => {
      //   this.router.navigate(['/p'])
      // })
    })
  }

  getHomeRecentBlogs(length: number = this.initialLengthOfHomeBlogs) {
    this.http.get<Post[]>(`${this.apiUrl}api/home/recent_blogs/0/` + length).subscribe((data) => {
      this.homeBlogs.next(data);
    })
  }
  get _homeBlogs() {
    return this.homeBlogs.asObservable();
  }

}
