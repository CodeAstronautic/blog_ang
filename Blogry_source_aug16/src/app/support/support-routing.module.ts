import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogviewComponent } from './blogview/blogview.component';
import { SupportComponent } from './support.component';

const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
  },
  {
    path: 'blog/:postid',
    component: BlogviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
