import { Injectable } from '@angular/core';
import { Month, Year } from '../models/date';

@Injectable()
export class DateService {

  constructor() { }

  getMonths():Array<Month> {
    let months : Month[] = [];
    var locale = "en-us";
    for (let x = 0; x< 12; x++) {
      let today = new Date();
      today.setDate(1)
      today.setMonth(x);
      let oMonth : Month = { monthVal: x + 1, monthDescs: today.toLocaleString(locale, { month: 'long' }) };
      months.push(oMonth);
    }

    return months;
  }

  getYears(): Array<Year> {
    let years : Year[] = [];
    let today = new Date();

    let startYear = today.getFullYear() - 10;
    let endYear = today.getFullYear() + 10;
    for (let x= startYear; x<=endYear; x++) {
      let oYear : Year = { yearVal : x, yearDescs : x.toString() };
      years.push(oYear);
    }

    return years;
  }

}
