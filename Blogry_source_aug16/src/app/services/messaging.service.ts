import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log('Permission granted! Save to the server!', token);
    }, (error) => {
      console.log(error);
    })
  }

  receiveMessage() {
    this.angularFireMessaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      alert(payload);
      this.currentMessage.next(payload);
    });
  }
}
