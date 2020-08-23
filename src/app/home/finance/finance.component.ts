import { Component, OnInit, SimpleChanges } from '@angular/core';
import {UserService} from '../user/Suser.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-data',
    templateUrl: './finance.component.html',
    styleUrls: ['./finance.component.scss']
})
export class FinanceComponent{

    finance=[];
    Users=[];
    currentTime:String;
    startTime:String;
    hours:String;
    user:String;
    myform:FormGroup;
    date;
    showSuccess:boolean;
    isLoading:boolean;
    showError:boolean;
    constructor(private httpClient: HttpClient,private userService:UserService){
      this.date= new Date();
      this.currentTime=this.date.getDate()+"-"+(this.date.getMonth()+1)+"-"+this.date.getFullYear()+" "+this.date.getHours()+":"+this.date.getMinutes();
      this.showSuccess=false;
      this.showError=false;
      this.isLoading=true;
      console.log(this.currentTime);
    }
    ngOnInit(){
        this.userService.getFinance().subscribe((data)=>{
          this.finance=data;
          console.log(this.finance);
        });
        this.userService.getUser().subscribe((data)=>{
          this.Users=data;
          console.log(this.Users);
        });
        console.log(this.currentTime);
        this.myform = new FormGroup({
          'user':new FormControl(null, [Validators.required]),
          'endDate':new FormControl(null,[Validators.required]), 
          'amount':new FormControl(null,[Validators.required]),
          'status':new FormControl(null,[Validators.required])
       });
       this.myform.get('endDate').setValue(this.currentTime);
       this.isLoading=false;
    }
  
    onSubmit(){
      this.isLoading=true;
        var amount=this.myform.get('amount').value;
        this.currentTime=this.myform.get('endDate').value;
        this.user=this.myform.get('user').value;
        var status=this.myform.get('status').value;
        
       
        var Obj={"name":this.user,"pt_date":this.currentTime,"amt":amount,"status":status,"account_id":0};
        this.userService.addFinance(Obj).subscribe((data)=>{
            console.log(data);
            this.showSuccess=true;
            this.isLoading=false;

            this.userService.getFinance().subscribe((data)=>{
              this.finance=data;
              console.log(this.finance);
            });
        },error=>{console.log("Error occured");this.showError=true;this.isLoading=false;})
    }

    deleteFinance(id:String){
      this.isLoading=true;
   
     this.userService.deleteFinance(id).subscribe((data)=>{
      console.log(data);
      this.showSuccess=true;
      this.userService.getFinance().subscribe((data)=>{
          this.finance=data;
          this.isLoading=false;
      })
    },error=>{console.log("Error occured");this.showError=true;this.isLoading=false;});
   
  }
  

}