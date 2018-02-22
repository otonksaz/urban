import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {ReportInvoice} from '../models/reportInvoice';
import {environment} from '../../environments/environment';

@Injectable()

export class ReportService {
    private url: string = environment.BASE_URL + "/getpdftagihan/";

    constructor(private _http: HttpClient) {}

    private extractData(res: any) {
        const body = res.data;
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public getInvoiceReport(rt: string, startDate: string, endDate: string) {
        const httpOptions = {
            headers: new HttpHeaders(
              { 
                'Content-Type': 'blob'
              }
            )
        };
        
        return this._http.get(this.url + '?rt=' + rt + '&startDate=' + startDate + '&endDate=' + endDate, httpOptions)
            .map(
            (res) => {
                return new Blob([res], {type: 'application/pdf'})
            })
    }
    //            .map((res: any) => res);
    //    }
    //      public getInvoiceReport(rt: string, startDate: string, endDate: string) {
    //          window.location.href = this.url + '?rt=' + rt + '&startDate=' + startDate + '&endDate=' + endDate;
    //      }

}
