import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WriteBlogComponent } from './write-blog/write-blog.component';
import { SettingsComponent } from './settings/settings.component';
import { StatsComponent } from './stats/stats.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { MydraftsComponent } from './mydrafts/mydrafts.component';
import { SavedblogsComponent } from './savedblogs/savedblogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxTagsModule } from 'ngx-tags-input-box';
import { NgxInputTagModule } from '@ngx-lite/input-tag';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DashboardComponent,
    HelpdeskComponent,
    MyprofileComponent,
    NotificationsComponent,
    WriteBlogComponent,
    SettingsComponent,
    StatsComponent,
    MyblogsComponent,
    MydraftsComponent,
    SavedblogsComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgxInputTagModule,
    NgxTagsModule,
  ],
})
export class DashboardModule { }
