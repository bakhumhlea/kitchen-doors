import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from '../environments/environment';
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
import { MenuItemsComponent } from './console/checks/view-check/menu-items/menu-items.component';
import { DetailsEditorComponent } from './console/checks/view-check/common/details-editor.component';
import { SettingPanelComponent } from './navigation/setting-panel/setting-panel.component';
import { HeaderService } from './navigation/header/header.service';


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
    DetailsEditorComponent,
    SaveChangesModalComponent,
    MenuItemsComponent,
    SettingPanelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    DashboardService,
    ViewCheckService,
    AuthServices,
    CheckService,
    AnimationService,
    HeaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CustomerLookupComponent, 
    SaveChangesModalComponent,
    DetailsEditorComponent
  ]
})
export class AppModule { }
