import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {ReportInvoice} from '../models/reportInvoice';
import {environment} from '../../environments/environment';

@Injectable()

export class ReportService {
    private url: string = environment.BASE_URL + "/getpdftagihan/";
    private token: string;

    constructor(private _http: Http) {
      var token = localStorage.getItem("token");
      this.token = token;
    }

    private extractData(res: Response) {
        const body = res.json().data;
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
        let headers = new Headers({'Authorization': 'Token ' + this.token, 'accept': 'application/pdf'});
        let options = new RequestOptions({headers: headers, responseType: ResponseContentType.Blob});
        return this._http.get(this.url + '?rt=' + rt + '&startDate=' + startDate + '&endDate=' + endDate, options)
            .map(
            (res) => {
                return new Blob([res.blob()], {type: 'application/pdf'})
            })
    }
    //            .map((res: any) => res);
    //    }
    //      public getInvoiceReport(rt: string, startDate: string, endDate: string) {
    //          window.location.href = this.url + '?rt=' + rt + '&startDate=' + startDate + '&endDate=' + endDate;
    //      }

}
