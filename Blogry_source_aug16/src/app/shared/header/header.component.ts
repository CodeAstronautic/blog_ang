import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Location } from "@angular/common";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { BlogsService } from "src/app/frontend/service/blogs.service";
import { Category } from "src/app/classes/category";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";

import * as firebase from "firebase";
import { GlobalService } from "src/app/services/global.service";
import { NgxSpinnerService } from "ngx-spinner";

declare var window: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("loginButton") loginButton;

  deviceInfo = this.deviceService.getDeviceInfo();
  isMobile = this.deviceService.isMobile();
  isTablet = this.deviceService.isTablet();
  isDesktopDevice = this.deviceService.isDesktop();

  apiUrl = environment.apiUrl;
  searchForm: FormGroup;
  allCategories: Category[] = [];
  selectedCategoriesList: any[] = [];
  user_categories: any[] = [];

  currentUserData: any;

  showLoginForm = true;
  showForgetPasswordForm = false;

  loginForm: FormGroup;
  phoneLogin: FormGroup;

  signInForm: FormGroup;
  forgetPasswordForm: FormGroup;
  registerForm: FormGroup;

  loginErrorMessage = "";
  registerErrorMessage = "";
  registerSuccessMessage = "";
  forgetResponse = false;
  forgetMessage = "";
  forgetClass = "";

  showLoginOtpInput = false;
  showRegisterOtpInput = false;
  userAvatar = "../../../../assets/img/defaults/defaultAvatar.png";
  userFullName = "Blogry";

  // workPlaceHeader = false;
  showbar = false;
  supportCenter = false;
  recaptchaVerifier: any;
  dash = "/p/dashboard";
  ads = "/p/dashboard/blogry-ads";
  createad = "/p/dashboard/blogry-ads/create";
  adsense = "/p/dashboard/google-ads";
  createadsense = "/p/dashboard/google-ads/create";
  transactions = "/p/dashboard/transactions";
  earnings = "/p/dashboard/earnings";
  onepagewebsite = "/p/dashboard/one-page-website";

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public location: Location,
    private _fb: FormBuilder,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private http: HttpClient,
    private blogService: BlogsService,
    private deviceService: DeviceDetectorService,
    private globalService: GlobalService,
    private ngxLoader: NgxSpinnerService
  ) {
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(environment.firebaseConfig);
    }
    console.log(this.deviceInfo);
    router.events.subscribe((val) => {
      // if (location.path() == this.dash || location.path() == this.ads || location.path() == this.createad || location.path() == this.adsense || location.path() == this.createadsense || location.path() == this.transactions || location.path() == this.earnings || location.path() == this.onepagewebsite) {
      //   this.workPlaceHeader = true;
      // } else {
      //   this.workPlaceHeader = false;
      // }
      if (location.path() == "/support") {
        this.supportCenter = true;
      } else {
        this.supportCenter = false;
      }
    });
  }
  deviceDetection() {
    // console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    // const isMobile = this.deviceService.isMobile();
    // const isTablet = this.deviceService.isTablet();
    // const isDesktopDevice = this.deviceService.isDesktop();
  }

  getRandomColor2() {
    var length = 6;
    var chars = "0123456789ABCDEF";
    var hex = "#";
    while (length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return "#" + ("000000" + color).slice(-6);
  }
  openModal(content, size?: string) {
    this.showLoginForm = true;
    this.showLoginOtpInput = false;

    let modalSize = "md";

    if (size) {
      modalSize = size;
    }
    this.modalService.open(content, { centered: true, size: "md" }).result.then(
      (result) => {
        // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
    this.signInForm.reset();
    this.registerForm.reset();
  }
  handlehowHide() {
    this.showbar = true;
  }
  handlehideShow() {
    this.showbar = false;
  }
  createForms() {
    this.signInForm = this._fb.group({
      userName: ["", [Validators.required]],
      loginPassword: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
    this.registerForm = this._fb.group({
      newName: ["", [Validators.required]],
      newEmail: ["", [Validators.required, Validators.email]],
      userName: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      newPassword: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
    this.signInForm.controls.loginPassword.valueChanges.subscribe(
      (response) => {
        this.loginErrorMessage = "";
      }
    );
    this.forgetPasswordForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }
  changeUserName(event) {
    console.log(event.target.value);
    const input = event.target.value;
    if (input) {
      const string = isNaN(input);
      // console.log(isNaN(input)); // false if number
      if (!string) {
        console.log("set phone number validator");
        this.signInForm.controls.userName.updateValueAndValidity();
        this.signInForm.controls.userName.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]);
        this.signInForm.controls.userName.updateValueAndValidity();
      } else {
        console.log("set email & username validators");
        this.signInForm.controls.userName.updateValueAndValidity();
        this.signInForm.controls.userName.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ]);
        this.signInForm.controls.userName.updateValueAndValidity();
      }
      if (string) {
        // if(input.indexOf("@") > 0) {
        //   console.log('set email validators')
        //   this.signInForm.controls.userName.updateValueAndValidity();
        //   this.signInForm.controls.userName.setValidators([Validators.required, Validators.pattern(userEmailPattern), Validators.minLength(10), Validators.maxLength(50)]);
        //   this.signInForm.controls.userName.updateValueAndValidity();
        // } else {
        //   console.log('set user name validators')
        //   this.signInForm.controls.userName.updateValueAndValidity();
        //   this.signInForm.controls.userName.setValidators([Validators.required, Validators.pattern(userNamePattern), Validators.minLength(10), Validators.maxLength(50)]);
        //   this.signInForm.controls.userName.updateValueAndValidity();
        // }
      }
      console.log(input.substring(0, 1));
    }
  }
  selectCategory(index: number, catId: string) {
    console.log(index, catId);
    if (this.selectedCategoriesList.includes(catId, 0)) {
      // this.selectedCategoriesList.
      var index = this.selectedCategoriesList.indexOf(catId);
      this.selectedCategoriesList.splice(index, 1);
    } else {
      this.selectedCategoriesList.push(catId);
    }
    this.saveUserCategories();
    // console.log(this.selectedCategoriesList)
  }

  ifSelected(categoryId: string) {
    return this.selectedCategoriesList.includes(categoryId, 0);
    if (this.selectedCategoriesList.includes(categoryId, 0)) {
      return true;
    }
    return false;
  }
  userHaveCategory(categoryName: string) {
    if (this.user_categories.includes(categoryName, 0)) {
      return true;
    }
    return false;
  }
  ngOnInit(): void {
    this.globalService.toggle$.subscribe((toggle) => {
      if (toggle == true) {
        document.getElementById("loginButton").click();
        // this.loginButton.click;
      }
    });
    this.searchForm = this._fb.group({
      keyword: [null, [Validators.required, Validators.minLength(3)]],
    });
    this.authService.currentUser.subscribe((data: any) => {
      if (data) {
        // console.log('header user profile');
        // console.log(data)
        this.currentUserData = data;
        if (data.avatar && data.avatar != undefined) {
          this.userAvatar = this.apiUrl + "images/auth/" + data.avatar;
          // console.log(this.userAvatar);
          this.userFullName = data.name;
        }
        if (data.selected_category && data.selected_category.length > 0) {
          // console.log('user categories list')
          this.user_categories = data.selected_category;
          // console.log(this.user_categories);
          data.selected_category.forEach((cat) => {
            this.selectedCategoriesList.push(cat);
          });
          // this.selectedCategoriesList.push(userdata.selected_category);
        }
      }
    });
    this.createForms();
    this.blogService.all_categories2.subscribe((categories) => {
      // console.log('get categories list')
      this.allCategories = categories;
    });
  }

  openRegisterForm(status: boolean) {
    if (status) {
      this.showLoginForm = false;
    } else {
      this.showLoginForm = true;
    }
  }
  onSubmitLogin() {
    this.ngxLoader.show();
    console.log("header component ts start");
    const data = {
      email: this.signInForm.controls.userName.value,
      password: this.signInForm.controls.loginPassword.value,
      type: 2,
    };
    this.http.post(`${this.apiUrl}api/signin`, data).subscribe(
      (data: any) => {
        console.log(data);
        // if(data && data.message == 'Verify your Account.') {
        //   alert('Please verify your account before login.')
        //   this.ngxLoader.hide();
        //   return;
        // }
        if (data.success) {
          if (
            data.success == true &&
            this.authService.setLoginStatus(true, data.token)
          ) {
            let returnData = false;
            let userData2;
            this.http
              .get(`${this.apiUrl}api/user`)
              .subscribe((userData: any) => {
                this.authService.setUser(userData);
                setTimeout(() => {
                  userData2 = userData;
                  this.modalService.dismissAll();
                  setTimeout(() => {
                    this.ngxLoader.hide();
                  }, 500);
                }, 500);
                // location.reload();
              });
          }
          console.log("success");
        } else {
          this.loginErrorMessage = data.msg;
          console.log("false");
          this.ngxLoader.hide();
        }
      },
      (error) => {
        console.error("error caught in component");
        console.log(error);
        console.log(error.error);
        console.log(error.error.msg);
        this.loginErrorMessage = error.error.msg;
        this.ngxLoader.hide();
      }
    );
  }

  onSubmitRegister() {
    this.ngxLoader.show();
    console.log(this.registerForm.value);
    const data = {
      name: this.registerForm.controls.newName.value,
      username: this.registerForm.controls.userName.value,
      email: this.registerForm.controls.newEmail.value,
      mobile: this.registerForm.controls.phoneNumber.value,
      password: this.registerForm.controls.newPassword.value,
      type: 2,
    };
    this.http.post(`${this.apiUrl}api/signup`, data).subscribe(
      (data: any) => {
        console.log(data);
        // return;
        if (data.success) {
          this.registerSuccessMessage = data.msg;
          this.modalService.dismissAll();
          alert(data.message+', Please go to your email and verify your account before login.');
          if (data.success == true && this.authService.setLoginStatus(true, data.token)) {
            let returnData = false;
            let userData2;
            this.http.get(`${this.apiUrl}api/user`).subscribe((userData: any) => {
              this.authService.setUser(userData);
              userData2 = userData;
              this.modalService.dismissAll();
            });
          }
          console.log("success");
          this.ngxLoader.hide();
        } else {
          this.registerErrorMessage = JSON.stringify(data.msg);
          console.log("false");
          this.ngxLoader.hide();
        }
      },
      (error) => {
        console.error("error caught in component");
        console.log(error);
        console.log(error.error);
        console.log(error.error.msg);
        this.registerErrorMessage = JSON.stringify(error.error.msg);
        this.ngxLoader.hide();
      }
    );
  }

  onSubmitForget() {
    this.forgetResponse = false;
    this.forgetClass = "";
    this.forgetMessage = "";
    if (this.forgetPasswordForm.valid) {
      this.http
        .post(
          `${this.apiUrl}api/forget-password`,
          this.forgetPasswordForm.value
        )
        .subscribe((response: any) => {
          console.log(response);
          if (response.success) {
            this.forgetResponse = true;
            this.forgetClass = "success";
            this.forgetMessage =
              "Please check your email for further instructions.";
          } else {
            alert(
              "there is some problems occur, please try again after some time."
            );
            this.forgetResponse = true;
            this.forgetClass = "danger";
            if (response.msg) {
              this.forgetMessage = response.msg;
            } else {
              this.forgetMessage =
                "There is some problems occur, please try again after some time.";
            }
          }
        });
    } else {
      this.forgetResponse = true;
      this.forgetClass = "danger";
      this.forgetMessage = "Please fill the form correctly";
    }
  }

  get getUserImage() {
    return this.currentUserData && this.currentUserData.avatar
      ? this.apiUrl + "images/auth/" + this.currentUserData.avatar
      : "../../../../assets/img/defaults/defaultAvatar.png";
  }

  faceBookAuth() {
    this.AuthLogin(
      new firebase.default.auth.FacebookAuthProvider(),
      "facebook"
    );
  }
  googleAuth() {
    this.AuthLogin(new firebase.default.auth.GoogleAuthProvider(), "google");
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: any, providerName: string) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      const userGoogleData = {
        username: result.user.email,
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
        type: 1,
        social: [
          {
            plateform: providerName,
            token: result.user.refreshToken,
          },
        ],
      };
      // console.log('get user from firebase');
      // console.log(result);
      // console.log(result.user);
      // console.log(result.user.displayName);
      // console.log(result.user.email);
      // console.log(result.user.refreshToken);
      // console.log(result.user.photoURL);
      this.authService
        .signInWithGoogle(userGoogleData)
        .subscribe((data: any) => {
          // console.log(data);
          if (
            data.success == true &&
            this.authService.setLoginStatus(true, data.token)
          ) {
            let returnData = false;
            let userData2;
            this.http
              .get(`${this.apiUrl}api/user`)
              .subscribe((userData: any) => {
                // console.log(userData);
                this.authService.setUser(userData);
                userData2 = userData;
                // console.log(this.authService.userProfileData);
                // if (this.authService.userProfileData.selected_category && this.authService.userProfileData.selected_category.length < 1) {
                //   this.router.navigate(['/choose-category'])
                //     .then(() => {
                //       window.location.reload();
                //     });
                //   return;
                // }
                location.reload();
              });
          }
        });
    } catch (error) {
      // console.log(error);
      window.alert(
        "There is some issue from your provider, please use different authorisation."
      );
    }
  }

  onSearchSubmit() {
    if (this.searchForm.valid) {
      this.router.navigate([
        `/query/${this.searchForm.controls.keyword.value}/0/10`,
      ]);
    }
  }

  saveUserCategories() {
    if (this.selectedCategoriesList.length > 0) {
      const data = {
        selected_category: this.selectedCategoriesList,
      };
      this.authService.saveUserCategories(data);
    } else {
      alert("You need to have minimum one category.");
    }
  }
}
