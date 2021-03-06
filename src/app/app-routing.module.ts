import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChecksComponent } from './console/checks/checks.component';
import { ViewCheckComponent } from './console/checks/view-check/view-check.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'console/checks', component: ChecksComponent, canActivate: [AuthGuard]},
  { path: 'console/checks/viewcheck/:id', component: ViewCheckComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
