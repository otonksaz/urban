import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {PaymentUnpost} from '../models/payment_unpost';
import {environment} from '../../environments/environment';

@Injectable()

export class PaymentUnpostService {
    private baseurl: string = environment.BASE_URL;
    private url: string = this.baseurl + "/arledgertmps/";

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

    getLists(): any {
        return this._http.get(this.url).map(data => data);
    }

    getByUser(userId: number): any{
        return this._http.get(this.url + "?user=" + userId).map(data => data);
    }

    getById(id): any {
        return this._http.get(this.url + id + '/').map(data => data);
    }

    doApprove(data) {
        return this._http.post(this.baseurl + "/paymentapprove/",
            data
        ).map(this.extractData);
    }

    doReject(id) {
        return this._http.delete(this.baseurl + "/paymentcancel/" + id + "/").map(this.extractData);
    }
}