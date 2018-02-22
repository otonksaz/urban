import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

    generateInvoice(data): Observable<Invoice[]> {
        return this._http.post(this.url,
            data
        ).map(this.extractData);
    }

    getInvoices(): Observable<Invoice[]>{
        return this._http.get(this.url)
            .map(this.extractData);
    }

    getInvoicesbyLot(lot): Observable<Invoice[]>{
        return this._http.get(this.baseurl + "/getinvsbylot/?lot=" + lot)
            .map(this.extractData);
    }

    generateInvoicesPerLot(data): Observable<Invoice[]> {
        return this._http.post(this.baseurl + "/generateinvperlotandperiod/",
            data
        ).map(this.extractData);
    }

    getAgingbyLotAndTrxType(lot, trxtype): Observable<Invoice[]>{
        return this._http
            .get(this.baseurl + "/getagingbylotandtrxtype/?lot=" + lot + '&trxType=' + trxtype)
            .map(this.extractData);
    }
}
