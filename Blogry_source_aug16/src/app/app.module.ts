import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { NgHttpLoaderModule } from 'ng-http-loader';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';

import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './services/auth.service';
import { FrontendModule } from './frontend/frontend.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { Interceptor } from './services/interceptor';
import { PageService } from './services/page.service';
import { NgxTagsModule } from "ngx-tags-input-box";
import { NgxInputTagModule } from '@ngx-lite/input-tag';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SupportModule } from './support/support.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxInputTagModule.forRoot({ tagFormatter: (tag) => tag.toUpperCase() }),
    AngularFireAuthModule,
    EditorModule,
    AppRoutingModule,
    IvyCarouselModule,
    NgxSpinnerModule,
    // NgHttpLoaderModule.forRoot(),
    NgxTagsModule,
    SharedModule,
    FrontendModule,
    SupportModule,
    InfiniteScrollModule
  ],
  providers: [
    HttpErrorHandlerService,
    MessageService,
    AuthService,
    PageService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: TINYMCE_SCRIPT_SRC, useValue: '/assets/tinymce/tinymce.min.js' },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
