import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Ktp} from '../models/ktp';
import {environment} from '../../environments/environment';

@Injectable()

export class KtpService {
    private url: string = environment.BASE_URL + "/ktps/";
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

    getKtpList(): Observable<Ktp[]> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url, options)
            .map(this.extractData)
    }

    getKtp(id): Promise<Ktp> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + id + '/', options)
            .toPromise()
            .then(response => response.json() || {} as Ktp)
            .catch(this.handleError);
    }

    addKtp(ktp){
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
        return this._http.post(
            this.url,
            ktp,
            options
        ).map(res => res.json()).catch(this.handleError);;
    }

    updateKtp(id, ktp) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.put(
            this.url + id + "/",
            ktp,
            options
        ).map(res => res.json()).catch(this.handleErrorObservable);;
    }

    deleteKtp(id) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + id + "/", options);
    }
}