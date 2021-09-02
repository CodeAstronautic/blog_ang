import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.auth.mainLoader.next(true);
    if (localStorage.getItem('userToken') != null) {
      const token = localStorage.getItem('userToken');
      // if the token is  stored in localstorage add it to http header
      const headers = new HttpHeaders().set("Authorization", token);
      //clone http to the custom AuthRequest and send it to the server
      const AuthRequest = request.clone({ headers: headers });
      // setTimeout(() => {
      //   this.auth.mainLoader.next(false);
      // }, 2000);
      return next.handle(AuthRequest)
    } else {
      // setTimeout(() => {
      //   this.auth.mainLoader.next(false);
      // }, 2000);
      return next.handle(request);
    }
  }
}
