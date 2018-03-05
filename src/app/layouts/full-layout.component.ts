import { Component, OnInit } from '@angular/core';
import {BaseTrxComponent} from '../master/base.trx.component';
import { AuthService } from '../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent extends BaseTrxComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  public isAdmin : boolean = false;
  public isAuth : boolean = false;
  public userName: string = "";

  constructor(
    private auth: AuthService, 
    private thisRouter: Router,    
    private thisRoute: ActivatedRoute,
    private thisToastr: ToastrService
  ) {
    super(thisRouter, thisRoute, thisToastr);
    this.isAdmin = this.auth.isAdmin();
    this.isAuth = this.auth.isAuthenticated();
    this.userName = localStorage.getItem('urban_user');
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {} 
}
