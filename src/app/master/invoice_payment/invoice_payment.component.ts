import {BaseTrxComponent} from '../base.trx.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Invoice} from '../../models/invoice';
import {InvoicePayment} from '../../models/invoice_payment';
import {InvoicePaymentDetail} from '../../models/invoice_payment';
import {InvoicePaymentService} from '../../services/invoice_payment.service';
import {InvoiceService} from '../../services/invoice.service';
import {TrxtypeService} from '../../services/trxtype.service';
import {Trxtype} from '../../models/trxtype';

@Component({
    templateUrl: 'invoice_payment.component.html',
    providers: [InvoicePaymentService, TrxtypeService, InvoiceService]
})

export class InvoicePaymentComponent extends BaseTrxComponent implements OnInit {

    invoice_payment_form: FormGroup;
    result: Observable<Invoice[]>;
    invoices: Invoice[] = [];
    trxTypeResult: Observable<Trxtype[]>;
    trxTypes: Trxtype[] = [];

    constructor(
        private invoicePaymentService: InvoicePaymentService,
        private invoiceService: InvoiceService,
        private trxtypeService: TrxtypeService,
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
        this.invoice_payment_form = formBuilder.group({
            docDate: [new Date((new Date()).setHours(0, 0, 0, 0)), Validators.required],
            trxType: ["", Validators.required],
            refNo: ["", Validators.required],
            docAmt: [, Validators.required],
        });

        this.url = "master/invoice";
    }

    ngOnInit(): void {

        this.init();
        this.getTrxType();

        //        console.log(this.invoice_form)
        //        console.log(new Date((new Date()).setHours(0, 0, 0, 0)))
        // if (this.method == this.ACTION_UPDATE) {
        //     this.bankService.getBank(this.id).then(data => {
        //         this.data = data;
        //         this.invoice_form = this.formBuilder.group({
        //             bankCd: [this.data.bankCd, Validators.required],
        //             descs: [this.data.descs, Validators.required],
        //             bankAccount: [this.data.bankAccount, Validators.required],
        //         });
        //     });
        // } else {
        this.result = this.invoiceService.getInvoices();
        this.result.subscribe(val => {this.invoices = val; this.dtTrigger.next()});
        // }
    }

    getTrxType() {
        this.trxTypeResult = this.trxtypeService.getLists();
        this.trxTypeResult.subscribe(val => {this.trxTypes = val});
    }

    saveAddItem(): void {
    }

    saveUpdateItem(id): void {
    }

    saveDeleteItem(id): void {
    }

    payment(): void {
        let oPayment = new InvoicePayment();
        let oPaymentDetail: InvoicePaymentDetail;
        let TotalSum: number = 0;
        oPayment.docDate = this.invoice_payment_form.controls['docDate'].value;
        oPayment.refNo = this.invoice_payment_form.controls['refNo'].value;
        oPayment.trxType = this.invoice_payment_form.controls['trxType'].value;
        for (let invoice of this.invoices) {

            if (invoice.checked) {
                if (invoice.paymentAmt > invoice.docAmt) {
                    this.toastr.error("Pembaran tidak boleh lebih besar dari Total Faktur");
                }
                oPaymentDetail = new InvoicePaymentDetail();
                oPaymentDetail.arLedgerInv = invoice.id;
                oPaymentDetail.allocAmt = invoice.paymentAmt;
                TotalSum += invoice.paymentAmt;
                oPayment.paymentDetails.push(oPaymentDetail);
            }
        }


        if (this.invoice_payment_form.controls['docAmt'].value !== TotalSum) {
            this.toastr.error("Total Amount Tidak sama dengan Total Pembayaran");
        } else {
            this.invoicePaymentService.savePayment(oPayment).subscribe(
                error => console.log(error)
            );
            this.toastr.success("Data Anda Berhasil Di simpan", "Success");
            location.reload();
        }
    }
}


