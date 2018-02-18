import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Invoice} from '../models/invoice';
import {environment} from '../../environments/environment';

@Injectable()

export class InvoiceService {
    private baseurl: string = environment.BASE_URL;
    private url: string = this.baseurl + "/generateinv/";
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

    generateInvoice(data): Observable<Invoice[]> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.post(this.url,
            data,
            options
        ).map(this.extractData);
    }

    getInvoices(): Observable<Invoice[]>{
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url, options)
            .map(this.extractData)
    }

    getInvoicesbyLot(lot): Observable<Invoice[]>{
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.baseurl + "/getinvsbylot/?lot=" + lot , options)
            .map(this.extractData)
    }

    generateInvoicesPerLot(data): Observable<Invoice[]> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.post(this.baseurl + "/generateinvperlotandperiod/",
            data,
            options
        ).map(this.extractData);
    }

    getAgingbyLotAndTrxType(lot, trxtype): Observable<Invoice[]>{
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http
            .get(this.baseurl + "/getagingbylotandtrxtype/?lot=" + lot + '&trxType=' + trxtype, options)
            .map(this.extractData)
    }
}
