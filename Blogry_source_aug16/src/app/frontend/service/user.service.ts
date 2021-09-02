import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  async updateUserProfile(payload: any) {
    return this.http.post(`${this.apiUrl}api/user`, payload);
  }

  async userNotifications() {
    return this.http.get(`${this.apiUrl}api/notification`);
  }

}
