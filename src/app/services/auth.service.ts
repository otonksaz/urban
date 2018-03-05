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

    public isAdmin(): boolean {
        let roles: string[]=[];
        let rolesnya = localStorage.getItem("urban_roles");
        if (rolesnya) {
            roles = JSON.parse(rolesnya);
            let res = roles.indexOf("admin");
            if (res > -1) {
                return true;
            }
        }
        return false;
    }

    public isUser(): boolean {
        let roles: string[]=[];
        let rolesnya = localStorage.getItem("urban_roles");
        if (rolesnya) {
            roles = JSON.parse(rolesnya);
            let res = roles.indexOf("admin");
            if (res > -1) {
                return true;
            }

            res = roles.indexOf("user");
            if (res > -1) {
                return true;
            }
        }
        return false;
    }

    logout(): void {
        this.token = null;
    }
}