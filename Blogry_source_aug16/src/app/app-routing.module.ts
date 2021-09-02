import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./frontend/frontend.module').then(m => m.FrontendModule)
  },
  {
    path: "p",
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]
  },
  {
    path: "support",
    loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { useHash: true, scrollPositionRestoration: 'top' }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
