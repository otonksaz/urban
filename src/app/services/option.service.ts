import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Option} from '../models/option';
import {environment} from '../../environments/environment';

@Injectable()

export class OptionService {
    private url: string = environment.BASE_URL + "/professionchoices/";

    constructor(private _http: HttpClient) {}

    private extractData(res: any) {
        const body = res;
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    getProffesions(): Observable<Option[]> {
        return this._http.get(this.url)
            .map(this.extractData);
    }

}
