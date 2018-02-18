import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {TrxtypeSettle} from '../models/trxtype_settle';
import {environment} from '../../environments/environment';
import {IServiceInterface} from "./service.interface";

@Injectable()

// Service for products data.
export class TrxtypeSettleService implements IServiceInterface{

  private url: string = environment.BASE_URL + "/trxtypesettles/";
  private token: string;

  constructor(private _http: Http) {
    var token = localStorage.getItem("token");
    this.token = token;
  }

  getLists(): any {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url, options).map(data => data.json())
  }

  getById(id: any): any {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url + id + '/', options).map(data => data.json())
  }

  save(object: any): any {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({method: RequestMethod.Post, headers: headers});
    return this._http.post( this.url, object, options )
  }

  update(id: any, object: any): any {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({headers: headers});
    return this._http.put( this.url + id + '/', object, options )
  }

  delete(id: any): any {
    let headers = new Headers({'Authorization': 'Token ' + this.token});
    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url + id, options);
  }
}