import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Activity} from '../models/activity';
import {environment} from '../../environments/environment';
import {IServiceInterface} from "./service.interface";

@Injectable()

export class ActivityService implements IServiceInterface{
    private url: string = environment.BASE_URL + "/activities/";

    constructor(private _http: HttpClient) {}

  getLists(): Observable<any> {
    return this._http.get(this.url).map(data => data);
  }

  getById(id: any): Observable<any> {
    return this._http.get(this.url + id + '/').map(data => data);
  }

  getByType(type: any): Observable<any> {
    return this._http.get(this.url + '?type=' + type).map(data => data);
  }

  save(object: any): Observable<any> {
    return this._http.post( this.url, object);
  }

  update(id: any, object: any): Observable<any> {
    return this._http.put( this.url + id + "/", object);
  }

  delete(id: any): Observable<any> {
    return this._http.delete(this.url + id + "/");
  }
}
