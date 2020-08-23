import { Component, OnInit, SimpleChanges } from '@angular/core';
import {MData} from './MData';
import {UserService} from '../user/Suser.service'
import { isNgTemplate } from '@angular/compiler';
@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit{
    mData:MData;
    userData=[];
    timeData=[];
    showSuccess:boolean;
    showError:boolean;
    isLoading:boolean;
    id=[];
    FinalData=[];
    hoursCount=[];
    constructor(private userService:UserService){
        this.showSuccess=false;
        this.showError=false;
        this.isLoading=true;
    }
    ngOnInit(){
       this.userService.getUser().subscribe((data)=>{
            this.userData=data;


            this.userService.getTimesheet().subscribe((data)=>{
                data=data.sort(function (a,b){
                    return a._id-b._id;
                });
                this.timeData=data;
                console.log(this.timeData);
     
                var k=0;
                console.log(this.userData);
                console.log(this.userData.length);
                for(k=0;k<this.userData.length;k++){
                     this.myfunction(this.userData[k]);
                }
                console.log(this.hoursCount);

                for(k=0;k<this.userData.length;k++){
                    var temp={};
                    temp["name"]=this.userData[k].name;
                    temp["startdate"]=this.userData[k].startdate;
                    temp["totalhours"]=this.hoursCount[k].hours;
                    temp["_id"]=this.userData[k]._id;
                    this.FinalData.push(temp);
                }
               // this.FinalData=this.userData.map((item,index)=>({...item,...this.hoursCount[index]}));
                console.log("Final Data");
                console.log(this.FinalData); 
            });
       });

  

     
      
      
      
       this.isLoading=false;
    }

     myfunction(item){
         var i=0;
         var totalhours=0;
         for(i=0;i<this.timeData.length;i++){
              if(this.timeData[i].name==item.name){
               totalhours=totalhours+this.timeData[i].hours;
              }
         }
         var obj={};
         obj["name"]=item.name;
         obj["hours"]=totalhours;
         this.hoursCount.push(obj);
      
//         this.hoursCount[item.name]=totalhours;
   }

    deleteTime(id:String){
        this.isLoading=true;
     
       this.userService.deleteTime(id).subscribe((data)=>{
        console.log(data);
        this.showSuccess=true;
        this.userService.getTimesheet().subscribe((data)=>{
            this.timeData=data;
            this.isLoading=false;
        })
      },error=>{console.log("Error occured");this.showError=true;this.isLoading=false;});
     
    }


    deleteUser(id:string){
        this.isLoading=true;
        console.log(name);
        // var obj={};
        // obj["name"]=name;
        this.userService.deleteUser(id).subscribe((data)=>{
            console.log(data);
            this.showSuccess=true;

            this.userService.getUser().subscribe((data)=>{
                this.userData=data;

                this.isLoading=false;
           });

          },error=>{console.log("Error occured");this.showError=true; this.isLoading=false;});
         
    }
}