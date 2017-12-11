import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Trxtype} from '../models/trxtype';
import {environment} from '../../environments/environment';

@Injectable()

export class TrxtypeService {
    private url: string = environment.BASE_URL + "/trxtypes/";
    private token: string = environment.token;

    constructor(private _http: Http) {}

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getTrxtypes(): Observable<Trxtype[]> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url, options)
            .map(this.extractData)
    }

    getTrxtype(id): Promise<Trxtype> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + id + '/', options)
            .toPromise()
            .then(response => response.json() || {} as Trxtype)
            .catch(this.handleError);
    }

    addTrxtype(trxtype){
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
        return this._http.post(
            this.url,
            trxtype,
            options
        ).map(res => res.json()).catch(this.handleError);;
    }

    updateTrxtype(id, trxtype) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.put(
            this.url + id + "/",
            trxtype,
            options
        ).map(res => res.json()).catch(this.handleErrorObservable);;
    }

    deleteTrxtype(id) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + id + "/", options);
    }
}