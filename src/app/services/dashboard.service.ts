import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class DashboardService {
    private url: string = environment.BASE_URL + "/dashboard/";

    constructor(private _http: HttpClient) {}

    private extractData(res: any) {
        const body = res.data;
        return body || {};
    }

    getData(): any {
        return this._http.get(this.url).map(this.extractData);
    }
}
