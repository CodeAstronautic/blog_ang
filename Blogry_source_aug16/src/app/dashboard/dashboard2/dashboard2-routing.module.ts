import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard2Component } from './dashboard2.component';
import { BlogryadsComponent } from './dindex/blogryads/blogryads.component';
import { CreateblogryadComponent } from './dindex/createblogryad/createblogryad.component';
import { CreategoogleadComponent } from './dindex/creategooglead/creategooglead.component';
import { DindexComponent } from './dindex/dindex.component';
import { EarningsComponent } from './dindex/earnings/earnings.component';
import { GoogleadsComponent } from './dindex/googleads/googleads.component';
import { OnePageWebsiteComponent } from './dindex/one-page-website/one-page-website.component';
import { TransactionsComponent } from './dindex/transactions/transactions.component';


const routes: Routes = [
  {
    path: "",
    component: Dashboard2Component,
    children: [
      {
        path: "",
        component: DindexComponent,
        // pathMatch: "full"
      },
      {
        path: "blogry-ads/create",
        component: CreateblogryadComponent,
        // pathMatch: "full"
      },
      {
        path: "blogry-ads",
        component: BlogryadsComponent,
        // pathMatch: "full"
      },
      {
        path: "google-ads/create",
        component: CreategoogleadComponent,
        // pathMatch: "full"
      },
      {
        path: "google-ads",
        component: GoogleadsComponent,
        // pathMatch: "full"
      },
      {
        path: "transactions",
        component: TransactionsComponent,
        // pathMatch: "full"
      },
      {
        path: "earnings",
        component: EarningsComponent,
        // pathMatch: "full"
      },
      {
        path: "one-page-website",
        component: OnePageWebsiteComponent,
        // pathMatch: "full"
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Dashboard2RoutingModule { }
