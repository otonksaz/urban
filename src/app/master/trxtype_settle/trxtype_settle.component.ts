import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {TrxtypeService} from '../../services/trxtype.service';
import {TrxtypeSettleService} from '../../services/trxtype_settle.service';

import {Observable} from 'rxjs/Observable';
import {Trxtype} from '../../models/trxtype';
import {TrxtypeSettle} from '../../models/trxtype_settle';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";


@Component({
    templateUrl: 'trxtype_settle.component.html',
    providers: [TrxtypeService, TrxtypeSettleService]
})

export class TrxtypeSettleComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    trxtype_settle_form: FormGroup;
    result: Observable<TrxtypeSettle[]>;    
    trxtypeSettles: TrxtypeSettle[] = [];
    trxtypeIResult: Observable<Trxtype[]>;
    trxtypesI: Trxtype[] = [];
    trxtypePResult: Observable<Trxtype[]>;
    trxtypesP: Trxtype[] = [];
    data: TrxtypeSettle;

    constructor(
        private trxtypeSettleService: TrxtypeSettleService,
        private trxtypeService: TrxtypeService,
        private routerTrxtypeSettle: Router,
        private routeTrxtypeSettle: ActivatedRoute,
        private toastrTrxtypeSettle: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerTrxtypeSettle, routeTrxtypeSettle, toastrTrxtypeSettle)
        this.router = routerTrxtypeSettle
        this.route = routeTrxtypeSettle
        this.toastr = toastrTrxtypeSettle
        this.IService = this
        this.trxtype_settle_form = formBuilder.group({
            trxDebit: [, Validators.required],
            trxCredit: [, Validators.required],
            trxDiscount: [, Validators.required]
        });

        this.url = "master/trxtypesettle";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.trxtypeSettleService.getById(this.id).subscribe(data => {
                    this.data = data;
                    this.trxtype_settle_form = this.formBuilder.group({
                        trxDebit: [this.data.trxDebit, Validators.required],
                        trxCredit: [this.data.trxCredit, Validators.required],
                        trxDiscount: [this.data.trxDiscount, Validators.required]
                    });
                });
            }            
        } else {
            this.result = this.trxtypeSettleService.getLists();
            this.result.subscribe(val => {this.trxtypeSettles = val; this.dtTrigger.next()});
        }
        this.getTrxtypeInvoiceList();
        this.getTrxtypePaymentList();
    }

    getTrxtypeInvoiceList() {
        this.trxtypeIResult = this.trxtypeService.getListsByTrxClass("I");
        this.trxtypeIResult.subscribe(val => {this.trxtypesI = val});
    }

    getTrxtypePaymentList() {
        this.trxtypePResult = this.trxtypeService.getListsByTrxClass("R");
        this.trxtypePResult.subscribe(val => {this.trxtypesP = val});
    }

    saveAddItem(): void {
        this.trxtypeSettleService.save(this.trxtype_settle_form.value).subscribe(
            success => {
                this.trxtypeSettleService.getLists().subscribe(val => {this.trxtypeSettles = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.rwNo);
            });
    }

    saveUpdateItem(url): void {
        this.trxtypeSettleService.update(url, this.trxtype_settle_form.value).subscribe(
            success => {
                this.trxtypeSettleService.getLists().subscribe(val => {this.trxtypeSettles = val})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.error_message);
            });
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.trxtypeSettleService.delete(url).subscribe(
                success => {
                    this.trxtypeSettleService.getLists().subscribe(val => {this.trxtypeSettles = val})
                    this.onSuccess("Data Anda Berhasil Di hapus");
                },
                error => {
                    let j_message = JSON.parse(error._body);
                    this.onError(j_message.error_message);
                });
        };
    }


}


