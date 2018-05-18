import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Invoice} from '../models/invoice';
import {Alloc} from '../models/alloc';
import {environment} from '../../environments/environment';

@Injectable()

export class InvoicePaymentService {
    private baseurl: string = environment.BASE_URL;
    private url: string = this.baseurl + "/paymentinv/";

    constructor(private _http: HttpClient) {}

    private extractData(res: any) {
        const body = res.data;
        return body || {};
    }

    private extractData2(res: any) {
        const body = res;
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    savePayment(data){
        return this._http.post(this.url,
            data
        ).map(this.extractData);
    }

    getAllocsbyLot(lot): Observable<Alloc[]>{
        return this._http.get(this.baseurl + "/getallocsbylot/?lot=" + lot)
            .map(this.extractData)
    }

    savePaymentByLot(data){
        return this._http.post(this.baseurl + "/paymentinvone/",
            data
        ).map(this.extractData2);
    }
}
