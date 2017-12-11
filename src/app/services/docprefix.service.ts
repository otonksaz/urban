import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Docprefix} from '../models/docprefix';
import {environment} from '../../environments/environment';

@Injectable()

export class DocprefixService {
    private url: string = environment.BASE_URL + "/docprefixs/";
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

    getDocprefixs(): Observable<Docprefix[]> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url, options)
            .map(this.extractData)
    }

    getDocprefix(id): Promise<Docprefix> {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + id + '/', options)
            .toPromise()
            .then(response => response.json() || {} as Docprefix)
            .catch(this.handleError);
    }

    addDocprefix(docprefix){
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
        return this._http.post(
            this.url,
            docprefix,
            options
        ).map(res => res.json()).catch(this.handleError);;
    }

    updateDocprefix(id, docprefix) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.put(
            this.url + id + "/",
            docprefix,
            options
        ).map(res => res.json()).catch(this.handleErrorObservable);;
    }

    deleteGroup(id) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + id + "/", options);
    }
}