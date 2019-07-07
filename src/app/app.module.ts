import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HeaderComponent } from './navigation/header/header.component';
import { ChecksComponent } from './console/checks/checks.component';
import { CheckComponent } from './console/checks/check/check.component';
import { ViewCheckComponent } from './console/checks/view-check/view-check.component';
import { ViewCheckService } from './console/checks/view-check/view-check.service';
import { ItemsTableComponent } from './console/checks/view-check/items-table/items-table.component';
import { CustomerLookupComponent } from './console/checks/view-check/common/customer-lookup.component';
import { AuthServices } from './auth/auth.service';
import { CheckService } from './console/checks/check/check.service';
import { SaveChangesModalComponent } from './common/save-changes-modal.component';
import { AnimationService } from './navigation/header/animation.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    SidenavComponent,
    HeaderComponent,
    ChecksComponent,
    CheckComponent,
    ViewCheckComponent,
    ItemsTableComponent,
    CustomerLookupComponent,
    SaveChangesModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    DashboardService,
    ViewCheckService,
    AuthServices,
    CheckService,
    AnimationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [CustomerLookupComponent, SaveChangesModalComponent]
})
export class AppModule { }
