import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {KK} from '../models/kk';
import {environment} from '../../environments/environment';
import {IServiceInterface} from "./service.interface";

@Injectable()

// Service for products data.
export class KKService implements IServiceInterface{

  private url: string = environment.BASE_URL + "/kks/";

  constructor(private _http: HttpClient) {}

  getLists(): any {
    return this._http.get(this.url).map(data => data);
  }

  getById(id: any): any {
    return this._http.get(this.url + id + '/').map(data => data);
  }

  save(object: any): any {
    return this._http.post( this.url, object).map(res => res);
  }

  update(id: any, object: any): any {
    return this._http.put( this.url + id + "/", object);
  }

  delete(id: any): any {;
    return this._http.delete(this.url + id);
  }
}
