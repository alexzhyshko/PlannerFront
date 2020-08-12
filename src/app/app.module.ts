import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule }   from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';

import { NgxWebstorageModule } from "ngx-webstorage";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { TokenInterceptor } from './token-interceptor';
import { HomeComponent } from './component/home/home.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SectionComponent } from './component/section/section.component';
import { AddDashboardComponent } from './component/add-dashboard/add-dashboard.component';
import { AddSectionComponent } from './component/add-section/add-section.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    DashboardComponent,
    SectionComponent,
    AddDashboardComponent,
    AddSectionComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ScrollingModule,
    NgScrollbarModule
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
