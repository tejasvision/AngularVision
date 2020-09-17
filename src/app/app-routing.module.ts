import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

import { AfterLoginComponent } from './_layout/after-login/after-login.component';
import { BeforeLoginComponent } from './_layout/before-login/before-login.component';
import { LoginComponent } from './_component/login/login.component';
import { PageNotFoundComponent } from './_component/page-not-found/page-not-found.component';
import { HomeComponent } from './_component/home/home.component';
import { RoleComponent } from './_component/role/role.component';
import { RoleAccessComponent } from './_component/role-access/role-access.component';
import { UserComponent } from './_component/user/user.component';
import { UserProfileComponent } from './_component/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: BeforeLoginComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '',
    component: AfterLoginComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'role', component: RoleComponent },
      { path: 'role-aceess', component: RoleAccessComponent },
      { path: 'user', component: UserComponent },
      { path: 'user-profile', component: UserProfileComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
