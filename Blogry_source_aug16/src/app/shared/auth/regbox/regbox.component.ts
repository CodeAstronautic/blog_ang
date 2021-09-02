import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-regbox',
  templateUrl: './regbox.component.html',
  styleUrls: ['./regbox.component.css']
})
export class RegboxComponent implements OnInit {

  loginType = 'otp';

  isValidEmail = false;

  loginButtonText = 'Get OTP & Verify';
  otpSent = false;
  errorMessage = '';
  errorType = 'danger';

  registerForm = this.fb.group({
    username: [null, [Validators.required, Validators.pattern('^[a-z0-9]{3,18}[a-z0-9]$')]],
    name: [null, [Validators.required]],
    email: [null, [Validators.email, Validators.required]],
    type: [2, [Validators.required]],
    otp: [],
    social_id: [null],
  });

  constructor(
    public fb: FormBuilder,
    public authService: AuthService
  ) {
  }

  signUp() {
    // console.log(this.registerForm.value)
    if (this.otpSent) {
      this.authService.verifyOTP(this.registerForm.controls.email.value, this.registerForm.controls.otp.value)
    } else {
      this.authService.signUpWithOTP(this.registerForm.value).subscribe((data: any) => {
        console.log(data)
        if (data.success) {
          this.otpSent = true;
          this.errorMessage = data.msg;
          this.errorType = 'success';
          this.loginButtonText = 'Verify & Login';
        } else {
          this.otpSent = false;
          this.errorMessage = data.msg;
          this.errorType = 'danger';
          this.loginButtonText = 'Get OTP & Verify';
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
