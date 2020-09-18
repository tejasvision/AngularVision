import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AfterLoginComponent } from './_layout/after-login/after-login.component';
import { BeforeLoginComponent } from './_layout/before-login/before-login.component';
import { LoginComponent } from './_component/login/login.component';
import { PageNotFoundComponent } from './_component/page-not-found/page-not-found.component';
import { HomeComponent } from './_component/home/home.component';
import { RoleComponent } from './_component/role/role.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './_component/user/user.component';
import { RoleAccessComponent } from './_component/role-access/role-access.component';
import { UrlSerializer } from "@angular/router";
import { LowerCaseUrlSerializer } from './_helper/UrlSerializer';
import { TreeModule } from '@circlon/angular-tree-component';
import { UserProfileComponent } from './_component/user-profile/user-profile.component';
import { TreeviewModule } from 'ngx-treeview';


@NgModule({
  declarations: [
    AppComponent,
    AfterLoginComponent,
    BeforeLoginComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    RoleComponent,
    UserComponent,
    RoleAccessComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    NgxSpinnerModule,
    CommonModule,
    BrowserAnimationsModule,
    TreeModule,
    TreeviewModule.forRoot(), 
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
