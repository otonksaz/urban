import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AddendumCharge} from '../../models/addendum_charge';
import {Lot} from '../../models/lot';
import {Charge} from '../../models/charge';
import {Trxtype} from '../../models/trxtype';
import {AddendumChargeService} from '../../services/addendum_charge.service';
import {LotService} from '../../services/lot.service';
import {ChargeService} from '../../services/charge.service';
import {TrxtypeService} from '../../services/trxtype.service';
import {CalcMethodOptions} from '../../constant/option'
import {Option} from '../../models/option';
import {IBaseTrxInterface} from "../base.trx.interface";
import {BaseTrxComponent} from "../base.trx.component";

@Component({
    templateUrl: 'addendum_charge.component.html',
    providers: [AddendumChargeService, LotService, ChargeService, TrxtypeService]
})

export class AddendumChargeComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    addendum_charge_form: FormGroup;
    result: Observable<AddendumCharge[]>;
    lotResult: Observable<Lot[]>;
    chargeResult: Observable<Charge[]>;
    trxtypeResult: Observable<Trxtype[]>;
    lots: Lot[] = [];
    charges: Charge[] = [];
    trxtypes: Trxtype[] = [];
    addendumCharges: AddendumCharge[] = [];
    data: AddendumCharge;
    calcMethodOptions: Option[] = [];

    constructor(
        private addendumChargeService : AddendumChargeService,
        private lotService: LotService,
        private chargeService: ChargeService,
        private trxtypeService: TrxtypeService,
        private routerAddendumCharge: Router,
        private routeAddendumCharge: ActivatedRoute,
        private toastrAddendumCharge : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerAddendumCharge, routeAddendumCharge, toastrAddendumCharge)
        this.router = routerAddendumCharge
        this.route = routeAddendumCharge
        this.toastr = toastrAddendumCharge
        this.IService = this;
        this.addendum_charge_form = formBuilder.group({
            calcMethod: ["", Validators.required],
            descs: ["", Validators.required],
            chargeAmt: ["", Validators.required],
            charge: ["", Validators.required],
            lot: ["", Validators.required],
            trxType: ["", Validators.required]
        });

        this.url = "master/addendumcharge";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.addendumChargeService.getById(this.id).subscribe(data => {
                    this.data = data;
                    this.addendum_charge_form = this.formBuilder.group({
                        calcMethod: [this.data.calcMethod, Validators.required],
                        descs: [this.data.descs, Validators.required],
                        chargeAmt: [this.data.chargeAmt, Validators.required],
                        charge: [this.data.charge, Validators.required],
                        lot: [this.data.lot, Validators.required],
                        trxType: [this.data.trxType, Validators.required]
                    });
                });
            }            
            this.getLots();
            this.getCharges();
            this.getTrxtypes();
            this.calcMethodOptions = CalcMethodOptions;
        } else {
            this.result = this.addendumChargeService.getLists();
            this.result.subscribe(val => {this.addendumCharges = val; this.dtTrigger.next()});
        }
    }

    getLots() {
        this.lotResult = this.lotService.getLists();
        this.lotResult.subscribe(val => {this.lots = val});
    }

    getCharges() {
        this.chargeResult = this.chargeService.getLists();
        this.chargeResult.subscribe(val => {this.charges = val});
    }

    getTrxtypes() {
        this.trxtypeResult = this.trxtypeService.getLists();
        this.trxtypeResult.subscribe(val => {this.trxtypes = val});
    }

    saveAddItem(): void {
        this.addendumChargeService.save(this.addendum_charge_form.value).subscribe(
          success => {
              this.addendumChargeService.getLists().subscribe(val => {this.addendumCharges = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(id): void {
        this.addendumChargeService.update(id, this.addendum_charge_form.value).subscribe(
          success => {
            this.addendumChargeService.getLists().subscribe(val => {this.addendumCharges = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.addendumChargeService.delete(id).subscribe(
              success => {
                this.addendumChargeService.getLists().subscribe(val => {this.addendumCharges = val})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
              });
        };
    }
}


