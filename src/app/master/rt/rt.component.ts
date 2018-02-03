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
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";


@Component({
    templateUrl: 'rt.component.html',
    providers: [RTService, RWService]
})

export class RTComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

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
                this.rtService.getById(this.id).subscribe(data => {
                    this.data = data;
                    this.rt_form = this.formBuilder.group({
                        rtNo: [this.data.rtNo, Validators.required],
                        rw: [this.data.rw, Validators.required]
                    });
                });
            }
            this.getRWList();
        } else {
            this.result = this.rtService.getLists();
            this.result.subscribe(val => {this.rts = val; this.dtTrigger.next()});
        }
    }

    getRWList() {
        this.rwResult = this.rwService.getLists();
        this.rwResult.subscribe(val => {this.rws = val});
    }

    saveAddItem(): void {
        this.rtService.save(this.rt_form.value).subscribe(
            success => {
                this.rtService.getLists().subscribe(val => {this.rts = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.rwNo);
            });
    }

    saveUpdateItem(url): void {
        this.rtService.update(url, this.rt_form.value).subscribe(
            success => {
                this.rtService.getLists().subscribe(val => {this.rts = val})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.error_message);
            });
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.rtService.delete(url).subscribe(
                success => {
                    this.rtService.getLists().subscribe(val => {this.rts = val})
                    this.onSuccess("Data Anda Berhasil Di hapus");
                },
                error => {
                    let j_message = JSON.parse(error._body);
                    this.onError(j_message.error_message);
                });
        };
    }


}


