import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) {}
  
    canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }

}


@Injectable()
export class AuthGuardAdminService {

  constructor(public auth: AuthService, public router: Router) {}
  
    canActivate(): boolean {
      if (!this.auth.isAdmin()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
}


@Injectable()
export class AuthGuardUserService {

  constructor(public auth: AuthService, public router: Router) {}
  
    canActivate(): boolean {
      if (!this.auth.isUser()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }

}