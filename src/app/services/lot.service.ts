import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {Lot} from '../models/lot';
import {environment} from '../../environments/environment';
import {IServiceInterface} from "./service.interface";

@Injectable()

export class LotService implements IServiceInterface{

  private url: string = environment.BASE_URL + "/lots/";

  constructor(private _http: HttpClient) {}


  getLists(): any {
    return this._http.get(this.url).map(data => data);
  }

  getById(id: any): any {
    return this._http.get(this.url + id + '/').map(data => data);
  }

  getByBlock(blockId: any): any {
    return this._http.get(this.url + '?block=' + blockId).map(data => data);
  }

  save(object: any): any {
    return this._http.post( this.url, object);
  }

  update(id: any, object: any): any {
    return this._http.put(this.url + id + "/", object);
  }

  delete(id: any): any {
    return this._http.delete(this.url + id + "/");
  }
}
