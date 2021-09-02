import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotifydropdownComponent } from './notifydropdown/notifydropdown.component';
import { HeaderComponent } from './header/header.component';
import { Header2Component } from './header2/header2.component';



@NgModule({
  declarations: [
    NotifydropdownComponent,
    HeaderComponent,
    Header2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [HeaderComponent, NotifydropdownComponent, Header2Component]
})
export class SharedModule { }
