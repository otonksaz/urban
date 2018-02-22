import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {AddendumCharge} from '../models/addendum_charge';
import {environment} from '../../environments/environment';
import {IServiceInterface} from "./service.interface";

@Injectable()

export class AddendumChargeService implements IServiceInterface{
  private url: string = environment.BASE_URL + "/addendumcharges/";

  constructor(private _http: HttpClient) {}

  getLists(): Observable<any> {
    return this._http.get(this.url).map(data => data);
  }

  getById(id: any): Observable<any> {
    return this._http.get(this.url + id + '/').map(data => data);
  }

  save(object: any): Observable<any> {
    return this._http.post( this.url, object).map(res => res);
  }

  update(id: any, object: any): Observable<any> {
    return this._http.put( this.url + id + "/", object).map(res => res);
  }

  delete(id: any): Observable<any> {
    return this._http.delete(this.url + id + "/");
  }
}
