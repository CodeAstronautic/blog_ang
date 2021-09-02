import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {

  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public globalServe: GlobalService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      console.log(data);
      console.log(data.verifycode)
      if (data.verifycode) {
        // this.verifyCode(data.verifycode);
      } else {
        alert('Code is not authenticate.');
        this.router.navigate(['/']);
      }
    })
  }

  verifyCode(verifycode: string) {
    this.http.get(`${this.apiUrl}verify-email/${verifycode}`).subscribe((response: any) => {
      if (response.success) {
        // alert then redirect
      } else {
        // alert then redirect
      }
    })
  }

  // http://13.55.148.125/api/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjYxMGEzY2RiNDkxNGJmOGFkOTc3Nzk2ZiIsImlhdCI6MTYyODA2MDg5MSwiZXhwIjoxNjI4NjY1NjkxfQ.0C0dvmVTvOvEuscafqoC3u71s3pQr-91BkyYDuZ7xVc

}
