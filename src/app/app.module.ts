import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {UserComponent} from './home/user/user.component';
import {TimesheetComponent} from './home/timesheet/timesheet.component';
import {UserService} from './home/user/Suser.service';
import { HttpClientModule } from '@angular/common/http';
import {DataComponent} from './home/data/data.component';
import {FinanceComponent} from './home/finance/finance.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    TimesheetComponent,
    DataComponent,
    FinanceComponent
  ],
  imports: [
    BrowserModule ,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent ]
})
export class AppModule { }
