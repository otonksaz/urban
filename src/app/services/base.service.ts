import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {environment} from '../../environments/environment';

@Injectable()

export class BaseService {
    protected url: string = environment.BASE_URL;
    protected token: string;
    protected headers = new Headers({'Authorization': 'Token ' + this.token});
    protected options = new RequestOptions({headers: this.headers});
    protected error: boolean = false;

    constructor(protected _http: Http) {
      var token = localStorage.getItem("token");
      this.token = token;
    }

    protected extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    protected handleErrorObservable(error: Response | any) {
        try {
            return Observable.throw(error.message || error);
        } catch (e) {
            throw e;
        }
    }

    protected handleError(error: any): Promise<any> {
        //        try {
        switch (error.status) {
            case 403: {

                return Promise.reject(new Error('fail')).then(function (error) {
                }, function (error) {
                    throw error;
                    //                    console.log(error); // Stacktrace
                });
                //                return Promise.reject("Authentication credentials were not provided");
            }
        }
        //            return Promise.reject(error.message || error);
        //        } catch (e) {
        //            throw (e);
        //        }
    }

    protected httpGet(url: string): Observable<Response> {
        try {
            return this._http.get(url, this.options);
        } catch (e) {
            throw e;
        }
    }

    protected httpPost(url: string, body: any): Observable<Response> {
        try {
            return this._http.post(url, body, this.options);
        } catch (e) {
            throw e;
        }
    }

    protected httpPut(url: string, body: any): Observable<Response> {
        try {
            return this._http.put(url, body, this.options);
        } catch (e) {
            throw e;
        }
    }

    protected httpDelete(url: string): Promise<Observable<Response>> {
        try {
            //                    return this._http.delete(url, this.options);
            return this._http.delete(url)
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
        } catch (e) {
            console.log('test' + e);
            throw e;
        }
    }
}
