import { Pipe, PipeTransform } from "@angular/core";
import { IEntityTable } from "../models/model.interface";

@Pipe({
    name: "sortBy"
})
export class SortByPipe implements PipeTransform {
    transform(value: IEntityTable[], field: string, desc: boolean) {
        if (field) {
            let arr = value.sort((a, b) => {
                if (typeof a[field] == "string") {
                    if (a[field].toLowerCase() > b[field].toLowerCase()) {
                        return 1;
                    }
                    else if (a[field].toLowerCase() < b[field].toLowerCase()) {
                        return -1;
                    }
                    else {
                        return 0;
                    }
                }
                else {
                    return a[field] - b[field];
                }
            });

            if (desc) {
                arr = arr.reverse();
            }

            return arr;
        }
        else {
            return value;
        }
    }
}