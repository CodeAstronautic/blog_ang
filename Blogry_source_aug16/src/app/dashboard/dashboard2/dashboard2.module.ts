import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard2RoutingModule } from './dashboard2-routing.module';
import { Dashboard2Component } from './dashboard2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxInputTagModule } from '@ngx-lite/input-tag';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxTagsModule } from 'ngx-tags-input-box';
import { BlogryadsComponent } from './dindex/blogryads/blogryads.component';
import { CreateblogryadComponent } from './dindex/createblogryad/createblogryad.component';
import { CreategoogleadComponent } from './dindex/creategooglead/creategooglead.component';
import { DindexComponent } from './dindex/dindex.component';
import { EarningsComponent } from './dindex/earnings/earnings.component';
import { GoogleadsComponent } from './dindex/googleads/googleads.component';
import { OnePageWebsiteComponent } from './dindex/one-page-website/one-page-website.component';
import { TransactionsComponent } from './dindex/transactions/transactions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    Dashboard2Component,
    DindexComponent,
    BlogryadsComponent,
    GoogleadsComponent,
    CreateblogryadComponent,
    CreategoogleadComponent,
    TransactionsComponent,
    EarningsComponent,
    OnePageWebsiteComponent
  ],
  imports: [
    CommonModule,
    Dashboard2RoutingModule,
    NgbModule,
    EditorModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxInputTagModule,
    NgxTagsModule,
  ]
})
export class Dashboard2Module { }
// NgbModule