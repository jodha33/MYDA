import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myform:FormGroup;
  

  email:string;
  password:string;

  constructor(private router:Router){
    this.myform = new FormGroup({
        'username':new FormControl(null, [Validators.required]),
        'password':new FormControl(null,[Validators.required])
    });
  }

  ngOnInit(){

  }

  onSubmit(){
    if(this.myform.get('username').value=="Jodha" && this.myform.get('password').value=='Winter@123abc'){
      this.router.navigate(["/home"]);
    }
}

}
