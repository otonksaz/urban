import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Charge} from '../../models/charge';
import {RT} from '../../models/rt';
import {Trxtype} from '../../models/trxtype';
import {ChargeService} from '../../services/charge.service';
import {RTService} from '../../services/rt.service';
import {TrxtypeService} from '../../services/trxtype.service';
import {CalcMethodOptions, IntervalTypeOptions} from '../../constant/option'
import {Option} from '../../models/option';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'charge.component.html',
    providers: [ChargeService, RTService, TrxtypeService]
})

export class ChargeComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    charge_form: FormGroup;
    result: Observable<Charge[]>;
    rtResult: Observable<RT[]>;
    trxTypeResult: Observable<Trxtype[]>;
    rts: RT[] = [];
    trxTypes: Trxtype[] = [];
    charges: Charge[] = [];
    data: Charge;
    calcMethodOptions: Option[] = [];
    intervalTypeOptions: Option[] = [];

    constructor(
        private chargeService : ChargeService,
        private rtService: RTService,
        private trxtypeService : TrxtypeService,
        private routerCharge: Router,
        private routeCharge: ActivatedRoute,
        private toastrCharge : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerCharge, routeCharge, toastrCharge)
        this.router = routerCharge
        this.route = routeCharge
        this.toastr = toastrCharge
        this.IService = this;
        this.charge_form = formBuilder.group({
            calcMethod: ["", Validators.required],
            intervalType: ["", Validators.required],
            interval: ["", Validators.required],
            descs: ["", Validators.required],
            chargeAmt: ["", Validators.required],
            rt: ["", Validators.required],
            trxType: ["", Validators.required]
        });

        this.url = "master/charge";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.chargeService.getById(this.id).subscribe(data => {
                    this.data = data;
                    this.charge_form = this.formBuilder.group({
                        calcMethod: [this.data.calcMethod, Validators.required],
                        intervalType: [this.data.intervalType, Validators.required],
                        interval: [this.data.interval, Validators.required],
                        descs: [this.data.descs, Validators.required],
                        chargeAmt: [this.data.chargeAmt, Validators.required],
                        rt: [this.data.rt, Validators.required],
                        trxType: [this.data.trxType, Validators.required]
                    });
                });
            }
            this.getRTs();
            this.getTrxTypes();
            this.intervalTypeOptions = IntervalTypeOptions
            this.calcMethodOptions = CalcMethodOptions
        } else {
            this.result = this.chargeService.getLists();
            this.result.subscribe(val => {this.charges = val; this.dtTrigger.next()});
        }
    }

    getRTs() {
        this.rtResult = this.rtService.getLists();
        this.rtResult.subscribe(val => {this.rts = val});
    }

    getTrxTypes() {
        this.trxTypeResult = this.trxtypeService.getLists();
        this.trxTypeResult.subscribe(val => {this.trxTypes = val});
    }

    saveAddItem(): void {
        this.chargeService.save(this.charge_form.value).subscribe(
          success => {
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(id): void {
        this.chargeService.update(id, this.charge_form.value).subscribe(
          success => {
            this.chargeService.getLists().subscribe(val => {this.charges = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.chargeService.delete(id).subscribe(
              success => {
                this.chargeService.getLists().subscribe(val => {this.charges = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.error_message);
              });
        };
    }
}


