import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise'
import {ReportInvoice} from '../models/reportInvoice';
import {environment} from '../../environments/environment';

@Injectable()

export class ReportService {
    private url: string = environment.BASE_URL + "/getpdftagihan/";

    constructor(private _http: HttpClient) {}

    private extractData(res: any) {
        const body = res.data;
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    public getInvoiceReport(rt: string, startDate: string, endDate: string) {        
        return this._http.get(this.url + '?rt=' + rt + '&startDate=' + startDate + '&endDate=' + endDate, 
                {responseType: 'blob', headers: new HttpHeaders({ 'accept': 'application/pdf' })})
            .map(
            (res) => {
                return new Blob([res], {type: 'application/pdf'})
            })
    }

    public getReceiptReport(rt: string, startDate: string, endDate: string, type: string) {        
        return this._http.get(environment.BASE_URL + "/getpdfreceipt/" + '?rt=' + rt + '&startDate=' 
                    + startDate + '&endDate=' + endDate + '&type=' + type, 
                {responseType: 'blob', headers: new HttpHeaders({ 'accept': 'application/pdf' })})
            .map(
            (res) => {
                return new Blob([res], {type: 'application/pdf'})
            })
    }

    public getMonthlyReport(month:string, year:string) {        
        return this._http.get(environment.BASE_URL + "/getpdflaporankeuangan/" + "?month=" + month + "&year=" + year, 
                {responseType: 'blob', headers: new HttpHeaders({ 'accept': 'application/pdf' })})
            .map(
            (res) => {
                return new Blob([res], {type: 'application/pdf'})
            })
    }
}
