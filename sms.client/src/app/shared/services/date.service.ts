import { Injectable } from '@angular/core';
import { EnumLookupItem, LookupItem } from '../models/responses/lookup-item';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  months(): EnumLookupItem[] {
    var monthNames = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
    let months:EnumLookupItem[] = []
    monthNames.forEach((el,i) => {
      months.push({id:i+1,name:monthNames[i]})
    });
    return months

  }

  constructor() { }
   years(no:number) : EnumLookupItem[]{
    var max = new Date().getFullYear()
    var min = max - no
    let years:EnumLookupItem[] = []
    for (var i = max; i >= min; i--) {
      var year=i.toString()
      years.push({id:i,name:year})
    }
    return years
  }

}
