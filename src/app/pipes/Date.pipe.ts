import { Pipe, PipeTransform } from "@angular/core";

//There are 10000 ticks in a millisecond. 
//And 621355968000000000 ticks between 1st Jan 0001 and 1st Jan 1970.
const jsTime: number = 621355968000000000;

@Pipe({
    name: "toDate"
})
//pipe for transfrom ticks number to date obj
export class DatePipe implements PipeTransform {
    transform(value: any) {
        return new Date((value - jsTime) / 10000);
    }
}