import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Bank} from '../../models/bank';
import {BankService} from '../../services/bank.service';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'bank.component.html',
    providers: [BankService]
})

export class BankComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    bank_form: FormGroup;
    result: Observable<Bank[]>;
    banks: Bank[] = [];
    data: Bank;

    constructor(
        private bankService: BankService,
        private routerBank: Router,
        private routeBank: ActivatedRoute,
        private toastrBank: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerBank, routeBank, toastrBank)
        this.router = routerBank
        this.route = routeBank
        this.toastr = toastrBank
        this.IService = this;
        this.bank_form = formBuilder.group({
            bankCd: ["", Validators.required],
            descs: ["", Validators.required],
            bankAccount: ["", Validators.required]
        });

        this.url = "master/bank";
    }

    ngOnInit(): void {

        this.init();
        if (this.method == this.ACTION_UPDATE) {
            this.bankService.getById(this.id).subscribe(data => {
                this.data = data;
                this.bank_form = this.formBuilder.group({
                    bankCd: [this.data.bankCd, Validators.required],
                    descs: [this.data.descs, Validators.required],
                    bankAccount: [this.data.bankAccount, Validators.required],
                });
            });
        } else {
            this.result = this.bankService.getLists();
            this.result.subscribe(val => {this.banks = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.bankService.save(this.bank_form.value).subscribe(
            success => {
                this.bankService.getLists().subscribe(val => {this.banks = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = error.error;
                this.onError(j_message.error_message);
            });
    }

    saveUpdateItem(id): void {
        this.bankService.update(id, this.bank_form.value).subscribe(
            success => {
                this.bankService.getLists().subscribe(val => {this.banks = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = error.error;
                this.onError(j_message.error_message);
            });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.bankService.delete(id).subscribe(
                success => {
                    this.bankService.getLists().subscribe(val => {this.banks = val})
                    this.onSuccess("Data Anda Berhasil Di hapus");
                },
                error => {
                    let j_message = error.error;
                    this.onError(j_message.error_message);
                });
        };
    }
}


