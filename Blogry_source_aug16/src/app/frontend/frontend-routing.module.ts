import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { VerifyemailComponent } from './auth/verifyemail/verifyemail.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { FrontendComponent } from './frontend.component';
import { ChoosecategoryComponent } from './newsignup/choosecategory/choosecategory.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { SearchComponent } from './pages/search/search.component';
import { TermsComponent } from './pages/terms/terms.component';

const routes: Routes = [
  {
    path: "",
    component: FrontendComponent,
    // pathMatch: "full",
    children: [
      { path: "", component: HomeComponent },
      { path: "blog/:postid", component: BlogdetailsComponent },
      { path: "query/:keyword/:page/:limit", component: SearchComponent },
      { path: "choose-category", component: ChoosecategoryComponent, canActivate: [AuthGuard] },
      { path: "about-us", component: AboutusComponent },
      // { path: "faq", component: FaqComponent },
      { path: "privacy-policy", component: PrivacypolicyComponent },
      { path: "terms-and-conditions", component: TermsComponent },
      { path: "contact-us", component: ContactusComponent },
      { path: "password-reset/:userid/:verifycode", component: ResetpasswordComponent },
      { path: "verify-email/:verifycode", component: VerifyemailComponent },
      // http://13.55.148.125/password-reset/60c3408f416c6f1e27bb4e5e/8e48aa1ef7a56d0fc735b34b2062ed1b1be08f54e0e7fadc52a0dd2c6aaf3d5e
      // http://13.55.148.125/api/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjYxMGEzY2RiNDkxNGJmOGFkOTc3Nzk2ZiIsImlhdCI6MTYyODA2MDg5MSwiZXhwIjoxNjI4NjY1NjkxfQ.0C0dvmVTvOvEuscafqoC3u71s3pQr-91BkyYDuZ7xVc
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
