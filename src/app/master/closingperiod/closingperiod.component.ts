import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ClosingPeriod} from '../../models/closingperiod';
import {ClosingPeriodService} from '../../services/closingperiod.service';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'closingperiod.component.html',
    providers: [ClosingPeriodService]
})

export class ClosingPeriodComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    closing_form: FormGroup;
    result: Observable<ClosingPeriod[]>;
    closingPeriods: ClosingPeriod[] = [];
    data: ClosingPeriod;

    constructor(
        private closingService: ClosingPeriodService,
        private routerActivity: Router,
        private routeActivity: ActivatedRoute,
        private toastrActivity: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerActivity, routeActivity, toastrActivity)
        this.router = routerActivity
        this.route = routeActivity
        this.toastr = toastrActivity
        this.IService = this;
        
        this.closing_form = formBuilder.group({
            periodYear: ["", Validators.required],
            periodMonth: ["", Validators.required],
            periodStart: ["", Validators.required],
            periodEnd: ["", Validators.required]
        });

        this.url = "master/closing";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_ADD) {
            this.closingService.getLastPeriodOpen().subscribe(data => {
                this.data = data;
                this.closing_form = this.formBuilder.group({
                    periodYear: [this.data.periodYear, Validators.required],
                    periodMonth: [this.data.periodMonth, Validators.required],
                    periodStart: [this.data.periodStart, Validators.required],
                    periodEnd: [this.data.periodEnd, Validators.required]
                });
            });
        } else {
            this.result = this.closingService.getLists();
            this.result.subscribe(val => {this.closingPeriods = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.closingService.save(this.closing_form.value).subscribe(
            success => {
                this.closingService.getLists().subscribe(val => {this.closingPeriods = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = error.error;
                this.onError(j_message.error_message);
            });
    }

    saveUpdateItem(id): void {
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.closingService.delete(id).subscribe(
                success => {
                    this.closingService.getLists().subscribe(val => {this.closingPeriods = val})
                    this.onSuccess("Data Anda Berhasil Di hapus");
                },
                error => {
                    let j_message = error.error;
                    this.onError(j_message.error_message);
                });
        };
    }
}


