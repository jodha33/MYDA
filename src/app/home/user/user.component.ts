import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService} from './Suser.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  myform:FormGroup;
  start_date:string;
  showSuccess:boolean;
  showError:boolean;
  isLoading:boolean;
  constructor(private httpClient :HttpClient ,private Uservice:UserService) { 
    this.showError=false;
    this.showSuccess=false;
    this.isLoading=true;
  }

  ngOnInit(): void {

      var dObj=new Date();
      this.myform = new FormGroup({
           'name':new FormControl(null, [Validators.required]),
           'date':new FormControl(null,[Validators.required]) 
        });
        this.start_date=dObj.getDate()+"-"+(dObj.getMonth()+1)+"-"+dObj.getFullYear();
        this.myform.get('date').setValue(this.start_date);
        this.isLoading=false;
  }

  onSubmit(){
    this.isLoading=true;
      var name=this.myform.get('name').value;
      var date=this.myform.get('date').value;
      var Obj={"name":name,"startdate":date};
      this.Uservice.addUser(JSON.stringify(Obj))
      .subscribe((data)=>{
        console.log(data);
        this.showSuccess=true;
        this.isLoading=false;
      },error=>{console.log("Error occured");
      this.showError=true;
      this.isLoading=true;
    })
  }
}
