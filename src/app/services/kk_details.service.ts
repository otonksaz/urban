import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {KKDetails} from '../models/kk_details';
import {environment} from '../../environments/environment';
import {IServiceInterface} from "./service.interface";

@Injectable()

// Service for products data.
export class KKDetailsService implements IServiceInterface{
  private url: string = environment.BASE_URL + "/kkdetails/";
  private kkNo: string;

  constructor(private _http: HttpClient) {}

  getKKLists(kkNo: string): any {
    this.kkNo = kkNo;
    return this.getLists()
  }

  getLists(): any {
    return this._http.get(this.url + "?kk="+this.kkNo) .map(data => data);
  }

  getById(id: any): any {
    return this._http.get(this.url + id + '/').map(data => data);
  }

  save(object: any): any {
    return this._http.post( this.url, object);
  }

  update(id: any, object: any): any {
    return this._http.put( this.url + id + "/", object);
  }

  delete(id: any): any {
    return this._http.delete(this.url + id);
  }
}
