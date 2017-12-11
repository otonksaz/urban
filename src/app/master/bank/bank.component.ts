import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Bank} from '../../models/bank';
import {BankService} from '../../services/bank.service';

@Component({
    templateUrl: 'bank.component.html',
    providers: [BankService]
})

export class BankComponent extends BaseComponent implements OnInit, IBaseInterface {
    
    bank_form: FormGroup;
    result: Observable<Bank[]>;
    banks: Bank[] = [];
    data: Bank;

    constructor(
        private bankService : BankService,
        private routerBank: Router,
        private routeBank: ActivatedRoute,
        private toastrBank : ToastrService,
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
            this.bankService.getBank(this.id).then(data => {
                this.data = data;
                this.bank_form = this.formBuilder.group({
                    bankCd: [this.data.bankCd, Validators.required],
                    descs: [this.data.descs, Validators.required],
                    bankAccount: [this.data.bankAccount, Validators.required],
                });
            });
        } else {
            this.result = this.bankService.getBanks();
            this.result.subscribe(val => {this.banks = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.bankService.addBank(this.bank_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(id): void {
        this.bankService.updateBank(id, this.bank_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.bankService.deleteBank(id).subscribe(
                error => console.log(error)
            );
        };
    }
}


