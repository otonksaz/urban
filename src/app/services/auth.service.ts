import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
//import {LocalStorageService, SessionStorage} from 'ngx-webstorage';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    private url: string = environment.BASE_URL + "/api-token-auth/";
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    public token: string;

    constructor(
        private http: Http
    ) {
        var token = localStorage.getItem("token");
        this.token = token ;
    }

    login(user): Promise<any> {
        return this.http.post(this.url, user, {headers: this.headers})
            .toPromise();
    }

    public isAuthenticated(): boolean {
        var tokennya = localStorage.getItem("token");
        return tokennya ? true : false;
        //return this.token ? true : false;
    }

    logout(): void {
        this.token = null;
    }
}