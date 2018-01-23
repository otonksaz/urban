import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {ReportInvoice} from '../models/reportInvoice';
import {environment} from '../../environments/environment';

@Injectable()

export class ReportService {
    private url: string = environment.BASE_URL + "/getinvsrptbyrtandperiode/";
    private token: string = environment.token;

    constructor(private _http: Http) {}

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
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + '?rt=' + rt + '&startDate=' + startDate + '&endDate=' + endDate, options)
            .map(this.extractData)
    }

}