import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {RWService} from '../../services/rw.service';
import {Observable} from 'rxjs/Observable';
import {RW} from '../../models/rw';


@Component({
    templateUrl: 'rw.component.html',
    providers: [RWService]
})

export class RWComponent extends BaseComponent implements OnInit, IBaseInterface {

    rw_form: FormGroup;
    result: Observable<RW[]>;
    rws: RW[] = [];
    data: RW;

    constructor(
        private rwService: RWService,
        private routerRW: Router,
        private routeRW: ActivatedRoute,
        private toastrRW : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerRW, routeRW, toastrRW)
        this.router = routerRW
        this.route = routeRW
        this.toastr = toastrRW
        this.IService = this;
        this.rw_form = formBuilder.group({
            rwNo: ["", Validators.required],
            rwDescs: ["", ""]
        });
        
        this.url = "master/rw";
    }

    ngOnInit(): void {
        
        this.init();
        if (this.method == this.ACTION_UPDATE) {
            this.rwService.getRWByNo(this.id).then(data => {
                this.data = data;
                this.rw_form = this.formBuilder.group({
                    rwNo: [this.data.rwNo, Validators.required],
                    rwDescs: [this.data.rwDescs, ""]
                });
            });
        } else {
            this.result = this.rwService.getRWList();
            this.result.subscribe(val => {this.rws = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.rwService.addRW(this.rw_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(url): void {
        this.rwService.updateRW(url, this.rw_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.rwService.deleteRW(url).subscribe(
                error => console.log(error)
            );
//            this.result = this.rwService.getRWList();
//            this.result.subscribe(val => {this.rws = val; this.dtTrigger.next()});
        };
    }
}


