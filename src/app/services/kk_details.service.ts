import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {KKDetails} from '../models/kk_details';
import {environment} from '../../environments/environment';

@Injectable()

// Service for products data.
export class KKDetailsService {

    private url: string = environment.BASE_URL + "/kkdetails/";
    private token: string = environment.token;

    constructor(private _http: Http) {}

    addKKDetails(kkDetails) {
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
        return this._http.post(
            this.url,
            kkDetails,
            options
        ).map(res => res.json()).catch(this.handleError);;
    }

    getKKDetailsByNo(id): Promise<KKDetails> {
        //        let headers = new Headers({'Authorization': 'Token b156eb3d1c48875e967a7322cbfdc850ff31642a'});
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + id + '/', options)
            .toPromise()
            .then(response => response.json() || {} as KKDetails)
            .catch(this.handleError);
    }

    updateKKDetails(id, kkDetails) {
        //        let headers = new Headers({'Authorization': 'Token b156eb3d1c48875e967a7322cbfdc850ff31642a'});
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.put(
            this.url + id + "/",
            kkDetails,
            options
        ).map(res => res.json()).catch(this.handleErrorObservable);;
    }

    getKKDetailsList(kkNo: string): Observable<KKDetails[]> {
        //        let headers = new Headers({'Authorization': 'Token b156eb3d1c48875e967a7322cbfdc850ff31642a'});
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url + "?kk="+kkNo, options)
            .map(this.extractData)
    }

    deleteKKDetails(id) {
        //        let headers = new Headers({'Authorization': 'Token b156eb3d1c48875e967a7322cbfdc850ff31642a'});
        let headers = new Headers({'Authorization': 'Token ' + this.token});
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url + id, options);
        //        return this._http.delete(url);
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