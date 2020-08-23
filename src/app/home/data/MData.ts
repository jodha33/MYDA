import { identity } from "rxjs"

export class MData{
    name:string;
    hours:string;
    starttime:string;
    endtime:string;

    constructor(name:string, hours:string, starttime:string, endtime:string){
            this.name=name;
            this.hours=hours;
            this.starttime=starttime;
            this.endtime=endtime;
    }
}