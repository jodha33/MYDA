import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { MData } from '../data/MData';

@Injectable()
export class UserService{
    BaseURI:String;
    constructor(private httpClient: HttpClient) { 
       // this.BaseURI="http://localhost:5000";
        this.BaseURI="https://desolate-brook-57899.herokuapp.com";
    }

    

    addUser(Obj:string){
       let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = { headers: headers };
        return this.httpClient.post(this.BaseURI+"/Users",Obj,options);
    }

    getUser(){
        return this.httpClient.get(this.BaseURI+"/Users").pipe(map(responseData=>{
            const Users=[];
            for(const key in responseData){
                Users.push({...responseData[key],id:key});
            }
            return Users;
        }))
    }

    addTimeSheet(Obj){
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = { headers: headers };
        return this.httpClient.post(this.BaseURI+"/timesheets",Obj,options);
    }
    addFinance(Obj){
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = { headers: headers };
        return this.httpClient.post(this.BaseURI+"/PD",Obj,options);
    }


     getTimesheet(){
        return this.httpClient.get(this.BaseURI+"/timesheets").pipe(map(responseData=>{
            const Data=[];
            for(const key in responseData){
                Data.push({...responseData[key],id:key});
            }
            return Data;
        }))
     }

     getFinance(){
        return this.httpClient.get(this.BaseURI+"/PD").pipe(map(responseData=>{
            const Data=[];
            for(const key in responseData){
                Data.push({...responseData[key],id:key});
            }
            return Data;
        }))
     }

     deleteUser(id){
        return this.httpClient.delete(this.BaseURI+"/Users",{
            headers: new HttpHeaders({
                'id': id,
            })
        });
     }
     deleteFinance(id){
        return this.httpClient.delete(this.BaseURI+"/PD",{
            headers: new HttpHeaders({
                'id': id,
            })
        });
     }

     deleteTime(id){
            return this.httpClient.delete(this.BaseURI+"/timesheets",
            {
            headers: new HttpHeaders({
            'id': id,
            })
            });
     }
}