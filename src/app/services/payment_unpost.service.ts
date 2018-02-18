import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
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

    getLists(): any {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url, options).map(data => data.json());
    }

    doApprove(data) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.post(this.baseurl + "/paymentapprove/",
            data,
            options
        ).map(this.extractData);
    }

    doReject(id) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.baseurl + "/paymentcancel/" + id + "/",
            options
        ).map(this.extractData);
    }
}