import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './home/user/user.component';
import { TimesheetComponent } from './home/timesheet/timesheet.component';
import { DataComponent } from './home/data/data.component';
import { FinanceComponent } from './home/finance/finance.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent,children:[
    {path:'user',component:UserComponent},
    {path:'timesheet',component:TimesheetComponent},
    {path:'',component:TimesheetComponent},
    {path:'data',component:DataComponent},
    {path:'finance',component:FinanceComponent}
  ]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
