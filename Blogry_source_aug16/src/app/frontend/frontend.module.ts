import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { FrontendComponent } from './frontend.component';
import { BlogsService } from './service/blogs.service';
import { UserService } from './service/user.service';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { ChoosecategoryComponent } from './newsignup/choosecategory/choosecategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { TermsComponent } from './pages/terms/terms.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { VerifyemailComponent } from './auth/verifyemail/verifyemail.component';


@NgModule({
  declarations: [
    FrontendComponent,
    BlogdetailsComponent,
    ChoosecategoryComponent,
    AboutusComponent,
    TermsComponent,
    FaqComponent,
    PrivacypolicyComponent,
    ContactusComponent,
    SearchComponent,
    HomeComponent,
    ResetpasswordComponent,
    VerifyemailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    IvyCarouselModule,
    ReactiveFormsModule,
    FrontendRoutingModule,
    InfiniteScrollModule
  ],
  providers: [BlogsService, UserService]
})
export class FrontendModule { }
