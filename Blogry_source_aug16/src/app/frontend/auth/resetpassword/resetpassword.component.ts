import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  apiUrl = environment.apiUrl;

  isPasswordReset = false;
  isPasswordResetError = false;

  passwordResetForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public globalServe: GlobalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      console.log(data);
      console.log(data.userid)
      console.log(data.verifycode)
      if (data.userid && data.verifycode) {
        this.createForm();
        // this.verifyCode(data.userid, data.verifycode);
      } else {
        alert('Code is not authenticate.');
        this.router.navigate(['/']);
      }
    })
  }
  verifyCode(userid: string, verifycode: string) {
    this.http.get(`${this.apiUrl}password-reset/${userid}/${verifycode}`).subscribe((response: any) => {
      if (response.success) {
        // show reset form here
      } else {
        // alert then redirect
      }
    })
  }
  createForm() {
    this.passwordResetForm = this.fb.group({
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator })
  }
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['password_confirm'].value ? null : { 'mismatch': true };
  }
  onSubmitReset() { }

  // http://13.55.148.125/password-reset/60c3408f416c6f1e27bb4e5e/8e48aa1ef7a56d0fc735b34b2062ed1b1be08f54e0e7fadc52a0dd2c6aaf3d5e


}
