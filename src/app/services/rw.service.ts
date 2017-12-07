import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {RW} from '../models/rw';
import {environment} from '../../environments/environment';

@Injectable()

// Service for products data.
export class RWService {
    private url: string = environment.BASE_URL + "/rws/";
    private token: string = environment.token;

    constructor(private _http: Http) {}

    addRW(rw) {
        //        let headers = new Headers({'Authorization': 'Token b156eb3d1c48875e967a7322cbfdc850ff31642a'});
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
        console.log(rw)
        return this._http.post(
            this.url,
            rw,
            options
        ).map(res => res.json()).catch(this.handleError);;
    }

    getRWByNo(id): Promise<RW> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
        return this._http.get(this.url + id + '/')
            .toPromise()
            .then(response => response.json() || {} as RW)
            .catch(this.handleError);
    }

    updateRW(id, rw) {
        // let headers = new Headers({'Authorization': 'Token ' + this.token});
        //        let headers = new Headers({'Authorization': 'Token b156eb3d1c48875e967a7322cbfdc850ff31642a'});
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.put(
            this.url + id + "/",
            rw,
            options
        ).map(res => res.json()).catch(this.handleErrorObservable);;
    }

    getRWList(): Observable<RW[]> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url, options)
            .map(this.extractData)
    }

    deleteRW(id) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + id + "/", options);
    }

    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
}