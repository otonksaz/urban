import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {RTService} from '../../services/rt.service';
import {RWService} from '../../services/rw.service';

import {Observable} from 'rxjs/Observable';
import {RT} from '../../models/rt';
import {RW} from '../../models/rw';


@Component({
    templateUrl: 'rt.component.html',
    providers: [RTService, RWService]
})

export class RTComponent extends BaseComponent implements OnInit, IBaseInterface {

    rt_form: FormGroup;
    result: Observable<RT[]>;
    rwResult: Observable<RW[]>;
    rts: RT[] = [];
    rws: RW[] = [];
    data: RT;

    constructor(
        private rtService: RTService,
        private rwService: RWService,
        private routerRT: Router,
        private routeRT: ActivatedRoute,
        private toastrRT: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerRT, routeRT, toastrRT)
        this.router = routerRT
        this.route = routeRT
        this.toastr = toastrRT
        this.IService = this
        this.rt_form = formBuilder.group({
            rtNo: ["", Validators.required],
            rw: ["", Validators.required]
        });

        this.url = "master/rt";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.rtService.getRTByNo(this.id).then(data => {
                    this.data = data;
                    this.rt_form = this.formBuilder.group({
                        rtNo: [this.data.rtNo, Validators.required],
                        rw: [this.data.rw, Validators.required]
                    });
                });
            }
            this.getRWList();
        } else {
            this.result = this.rtService.getRTList();
            this.result.subscribe(val => {this.rts = val; this.dtTrigger.next()});
        }
    }

    getRWList() {
        this.rwResult = this.rwService.getRWList();
        this.rwResult.subscribe(val => {this.rws = val});
    }

    saveAddItem(): void {
        this.rtService.addRT(this.rt_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(url): void {
        this.rtService.updateRT(url, this.rt_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.rtService.deleteRT(url).subscribe(
                error => console.log(error)
            );
            //            this.result = this.rwService.getRWList();
            //            this.result.subscribe(val => {this.rws = val; this.dtTrigger.next()});
        };
    }


}


