import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private token: String;

    constructor(
        private router: Router,
        private toastr?: ToastrService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("interceptor jalan");
        
        this.token = localStorage.getItem("token");

        let newReq;
        if (this.token){
            let tokenStr = "Token " + this.token;
            newReq = req.clone({ setHeaders: { Authorization: tokenStr } });
            //console.log(tokenStr);
        }

        return next.handle(newReq ? newReq : req).do(event => {}, err => {
            if (err instanceof HttpErrorResponse) {
                if (err.status == 401 || err.status == 403) {
                    if (this.router.url != '/login') {
                        this.router.navigate(['login']);
                    }
                }
                else if (err.status == 0) {
                    this.toastr.error("Cannot comunicate with server.", "ERROR");
                }
                else if (err.status == 500) {
                    this.toastr.error("Error on the server.", "ERROR");
                }
            }
        });
    }
}