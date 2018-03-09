import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Invoice} from '../../models/invoice';
import {InvoiceService} from '../../services/invoice.service';
import {Charge} from '../../models/charge';
import {ChargeService} from '../../services/charge.service';

@Component({
    templateUrl: 'invoice.component.html',
    providers: [InvoiceService, ChargeService]
})

export class InvoiceComponent extends BaseComponent implements OnInit {

    invoice_form: FormGroup;
    result: Observable<Invoice[]>;
    invoices: Invoice[] = [];
    chargeResult: Observable<Charge[]>;
    charges: Charge[] = [];

    constructor(
        private invoiceService: InvoiceService,
        private chargeService: ChargeService,
        private routerInvoice: Router,
        private routeInvoice: ActivatedRoute,
        private toastrInvoice: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerInvoice, routeInvoice, toastrInvoice)
        this.router = routerInvoice;
        this.route = routeInvoice;
        this.toastr = toastrInvoice;
        this.IService = this;
        this.invoice_form = formBuilder.group({
            charge: ["", Validators.required],
            docDate: [new Date((new Date()).setHours(0, 0, 0, 0)), Validators.required]
        });

        this.url = "master/invoice";
    }

    ngOnInit(): void {

        this.init();
        this.getCharges();

        // this.result = this.invoiceService.getInvoices();
        // this.result.subscribe(val => {this.invoices = val; this.dtTrigger.next()});

    }

    getCharges() {
        this.chargeResult = this.chargeService.getLists();
        this.chargeResult.subscribe(val => {this.charges = val});
    }

    saveAddItem(): void {
    }

    saveUpdateItem(id): void {
    }

    saveDeleteItem(id): void {
    }

    generateInvoice() {
        this.invoiceService.generateInvoice(this.invoice_form.value).subscribe(
            success => {
                this.toastr.success("Data berhasil tergenerate");
                this.invoices = success;
                this.dtTrigger.next()
            },
            error=> {
                let j_message = error.error;
                this.toastr.error(j_message.error_message);
            });
    }
}


