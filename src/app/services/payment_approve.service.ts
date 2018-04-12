import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {PaymentApprove} from '../models/payment_approve';
import {environment} from '../../environments/environment';

@Injectable()

export class PaymentApproveService {
    private baseurl: string = environment.BASE_URL;
    private url: string = this.baseurl + "/paymentapproves/";

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

    getById(id): any {
        return this._http.get(this.url + id + '/').map(data => data);
    }

    doApprove(data) {
        return this._http.post(this.baseurl + "/paymentapprove/",
            data
        ).map(this.extractData);
    }

    public tandaTerima(id) {        
        return this._http.get(environment.BASE_URL + "/tandaterimapdf/?id=" + id, 
                {responseType: 'blob', headers: new HttpHeaders({ 'accept': 'application/pdf' })})
            .map(
            (res) => {
                return new Blob([res], {type: 'application/pdf'})
            })
    }
}