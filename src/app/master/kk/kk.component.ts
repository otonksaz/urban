import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {KKService} from '../../services/kk.service';
import {LotService} from '../../services/lot.service';
import {Observable} from 'rxjs/Observable';
import {KK} from '../../models/kk';
import {Lot} from '../../models/lot';

@Component({
    templateUrl: 'kk.component.html',
    providers: [KKService, LotService]
})

export class KKComponent extends BaseComponent implements OnInit, IBaseInterface {

    kk_form: FormGroup;
    result: Observable<KK[]>;
    lotResult: Observable<Lot[]>;
    kks: KK[] = [];
    lots : Lot[] = [];
        
    data: KK;

    constructor(
        private kkService: KKService,        
        private lotService: LotService, 
        private routerKK: Router,
        private routeKK: ActivatedRoute,
        private toastrKK: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerKK, routeKK, toastrKK)
        this.router = routerKK
        this.route = routeKK
        this.toastr = toastrKK
        this.IService = this
        this.kk_form = formBuilder.group({
            kkNo: ["", Validators.required],
            address: ["", Validators.required],
            lot: ["", Validators.required]
        });

        this.url = "master/kk";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.kkService.getKKByNo(this.id).then(data => {
                    this.data = data;
                    this.kk_form = this.formBuilder.group({
                        kkNo: [this.data.kkNo, Validators.required],
                        address: [this.data.address, Validators.required],
                        lot: [this.data.lot, Validators.required]
                    });
                });
            }
            this.getLotList();
        } else {            
            this.result = this.kkService.getKKList();
            this.result.subscribe(val => {this.kks = val; this.dtTrigger.next()});
        }
    }

    getLotList() {
        this.lotResult = this.lotService.getLotList();
        this.lotResult.subscribe(val => {this.lots = val});
    }

    saveAddItem(): void {
        this.kkService.addKK(this.kk_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(url): void {
        this.kkService.updateKK(url, this.kk_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.kkService.deleteKK(url).subscribe(
                error => console.log(error)
            );
            //            this.result = this.rwService.getRWList();
            //            this.result.subscribe(val => {this.rws = val; this.dtTrigger.next()});
        };
    }


}