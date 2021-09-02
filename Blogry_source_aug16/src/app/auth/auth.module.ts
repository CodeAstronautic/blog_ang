import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginboxComponent } from './loginbox/loginbox.component';
import { RegisterboxComponent } from './registerbox/registerbox.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginboxComponent,
    RegisterboxComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
