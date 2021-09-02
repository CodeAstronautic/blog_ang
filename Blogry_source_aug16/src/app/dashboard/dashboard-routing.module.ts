import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { MydraftsComponent } from './mydrafts/mydrafts.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SavedblogsComponent } from './savedblogs/savedblogs.component';
import { SettingsComponent } from './settings/settings.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: MyprofileComponent,
        // pathMatch: "full"
      },
      {
        path: "settings",
        component: SettingsComponent,
        // pathMatch: "full"
      },
      {
        path: "dashboard/write",
        component: WriteBlogComponent,
        // pathMatch: "full"
      },
      {
        path: "dashboard/edit/:_id",
        component: WriteBlogComponent,
        // pathMatch: "full"
      },
      {
        path: "dashboard/blogs",
        component: MyblogsComponent,
        // pathMatch: "full"
      },
      {
        path: "dashboard/drafts",
        component: MydraftsComponent,
        // pathMatch: "full"
      },
      {
        path: "saved-blogs",
        component: SavedblogsComponent,
        // pathMatch: "full"
      },
      {
        path: "notifications",
        component: NotificationsComponent,
        // pathMatch: "full"
      },
      {
        path: "dashboard",
        loadChildren: () => import('./dashboard2/dashboard2.module').then(m => m.Dashboard2Module)
        // pathMatch: "full"
      },
      // {
      //   path: "dashboard/blogry-ads/create",
      //   component: CreateblogryadComponent,
      //   // pathMatch: "full"
      // },
      // {
      //   path: "dashboard/blogry-ads",
      //   component: BlogryadsComponent,
      //   // pathMatch: "full"
      // },
      // {
      //   path: "dashboard/google-ads/create",
      //   component: CreategoogleadComponent,
      //   // pathMatch: "full"
      // },
      // {
      //   path: "dashboard/google-ads",
      //   component: GoogleadsComponent,
      //   // pathMatch: "full"
      // },
      // {
      //   path: "dashboard/transactions",
      //   component: TransactionsComponent,
      //   // pathMatch: "full"
      // },
      // {
      //   path: "dashboard/earnings",
      //   component: EarningsComponent,
      //   // pathMatch: "full"
      // },
      // {
      //   path: "dashboard/one-page-website",
      //   component: OnePageWebsiteComponent,
      //   // pathMatch: "full"
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
