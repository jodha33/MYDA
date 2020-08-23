import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserService} from '../user/Suser.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-data',
    templateUrl: './timesheet.component.html',
    styleUrls: ['./timesheet.component.scss']
  })
export class TimesheetComponent implements OnInit{
  Users=[];
  currentTime:String;
  startTime:String;
  hours:Number;
  user:String;
  myform:FormGroup;
  date;
  showSuccess:boolean;
  showError:boolean;
  isLoading:boolean;
  constructor(private httpClient: HttpClient,private userService:UserService){
    this.date= new Date();
  //  this.currentTime=this.date.getDate()+"-"+(this.date.getMonth()+1)+"-"+this.date.getFullYear()+" "+this.date.getHours()+":"+this.date.getMinutes();
  this.currentTime=this.formatDate(new Date(),0);  
  this.showSuccess=false;
    this.showError=false;
    this.isLoading=true;
    console.log(this.currentTime);
  }

  formatDate(date:Date,t) {
    //date.getMinutes(date.getMinutes)
    var hours = date.getHours()-t;
    let minutes = date.getMinutes();
    var min;
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    min = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + min + ' ' + ampm;
    return  date.getDate()+ "-" +(date.getMonth()+1)  + "-" + date.getFullYear() + " " + strTime;
  }

  ngOnInit(){
      this.userService.getUser().subscribe((data)=>{
        this.Users=data;
        console.log(this.Users);
      });
      console.log(this.currentTime);
      this.myform = new FormGroup({
        'user':new FormControl(null, [Validators.required]),
        'endDate':new FormControl(null,[Validators.required]), 
        'hours':new FormControl(null,[Validators.required])
     });
     this.myform.get('endDate').setValue(this.currentTime);
     this.isLoading=false;
  }

  onSubmit(){
    this.isLoading=true;
      this.hours=this.myform.get('hours').value;
      this.currentTime=this.myform.get('endDate').value;
      this.user=this.myform.get('user').value;
      var shours=this.date.getHours()-Number(this.hours);
     // this.startTime=this.date.getDate()+"-"+this.date.getMonth()+"-"+this.date.getFullYear()+" "+shours+":"+this.date.getMinutes();
     this.startTime=this.formatDate(new Date(),this.hours) 
     var Obj={"name":this.user,"hours":this.hours,"starttime":this.startTime,"endtime":this.currentTime,"account_id":0};
     this.userService.addTimeSheet(Obj).subscribe((data)=>{
      console.log(data);
      this.showSuccess=true;
      this.isLoading=false; 
    },error=>{console.log("Error occured");this.showError=true; this.isLoading=false;})
  }

}