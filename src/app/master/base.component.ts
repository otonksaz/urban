import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {IBaseInterface} from './base.interface';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../services/auth.service';

@Component({
    template: ""
})
export class BaseComponent {

    //constant
    protected NEW_CODE: string = "new";
    protected ACTION_ADD: string = "add";
    protected ACTION_UPDATE: string = "update";
    protected ACTION_LIST: string = "list";
    protected IService: IBaseInterface;

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    sub: any;
    method: string;
    url: string;
    id: string;


    constructor(
        protected router?: Router,
        protected route?: ActivatedRoute,
        protected toastr?: ToastrService,
    ) {
        if (!localStorage.getItem("token")) {
            this.router.navigate(['login']);
        }
    }

    init() {

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];

            if (!this.id) {
                this.method = this.ACTION_LIST;
            } else if (this.id == this.NEW_CODE) {
                this.method = this.ACTION_ADD;
            } else {
                this.method = this.ACTION_UPDATE;
            }
        })
    }

    callForm(id?) {
        console.log(this.url);
        if (id) {
            this.router.navigate([this.url, id]);
        } else {
            this.router.navigate([this.url + "/" + this.NEW_CODE]);
        }
    }

    save() {
        if (this.method == this.ACTION_ADD) {
            this.saveAdd();
        } else if (this.method == this.ACTION_UPDATE) {
            this.saveUpdate();
        }
    }

    saveAdd() {
        this.IService.saveAddItem();
        this.toastr.success("Success", "Data Anda Berhasil Di simpan");
        this.router.navigate([this.url]);
    }

    saveUpdate() {
        this.IService.saveUpdateItem(this.id);
        this.toastr.success("Data Anda Berhasil Di simpan", "Success");
        this.router.navigate([this.url]);
    }

    saveDelete(id) {
        this.IService.saveDeleteItem(id);
        this.toastr.success("Data Anda Berhasil Di simpan", "Success");
    }

    onLogout() {
        localStorage.removeItem("token");
        this.router.navigate(['login']);
    }
}
