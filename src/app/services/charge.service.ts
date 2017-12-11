import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Charge} from '../models/charge';
import {environment} from '../../environments/environment';

@Injectable()

export class ChargeService {
    private url: string = environment.BASE_URL + "/charges/";
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

    getCharges(): Observable<Charge[]> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url, options)
            .map(this.extractData)
    }

    getCharge(id): Promise<Charge> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + id + '/', options)
            .toPromise()
            .then(response => response.json() || {} as Charge)
            .catch(this.handleError);
    }

    addCharge(charge){
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
        return this._http.post(
            this.url,
            charge,
            options
        ).map(res => res.json()).catch(this.handleError);;
    }

    updateCharge(id, charge) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.put(
            this.url + id + "/",
            charge,
            options
        ).map(res => res.json()).catch(this.handleErrorObservable);;
    }

    deleteCharge(id) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + id + "/", options);
    }
}