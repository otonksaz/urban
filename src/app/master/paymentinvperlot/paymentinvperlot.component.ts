import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Invoice} from '../../models/invoice';
import {PaymentInvByLot} from '../../models/payment_inv_by_lot';
import {PaymentInvByLotDetail} from '../../models/payment_inv_by_lot';
import {InvoicePaymentService} from '../../services/invoice_payment.service';
import {InvoiceService} from '../../services/invoice.service';
import {TrxtypeService} from '../../services/trxtype.service';
import {Trxtype} from '../../models/trxtype';
import {Lot} from '../../models/lot';
import {LotService} from '../../services/lot.service';

@Component({
    templateUrl: 'paymentinvperlot.component.html',
    providers: [InvoicePaymentService, TrxtypeService, InvoiceService, LotService]
})

export class PaymentInvPerLotComponent extends BaseComponent implements OnInit {

    invoice_payment_form: FormGroup;
    result: Observable<Invoice[]>;
    invoices: Invoice[] = [];
    invoice: Invoice;
    trxTypeResult: Observable<Trxtype[]>;
    trxTypes: Trxtype[] = [];
    lotResult:Observable<Lot[]>;
    lots: Lot[] = [];

    constructor(
        private invoicePaymentService: InvoicePaymentService,
        private invoiceService: InvoiceService,
        private trxtypeService: TrxtypeService,
        private LotService: LotService,
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
            lot: ["", Validators.required],
            trxTypeInv: ["", Validators.required],
            docAmt: [0, Validators.required],
            discountAmt: [0],
        });
        this.onChanges();
        this.url = "master/paymentinvperlot";
    }

    ngOnInit(): void {

        this.init();
        this.getLots();
        this.getTrxType();
        //this.result = this.invoiceService.getInvoices();
        //this.result.subscribe(val => {this.invoices = val; this.dtTrigger.next()});
    }

    getLots() {
        this.lotResult = this.LotService.getLists();
        this.lotResult.subscribe(val => {this.lots = val});
    }

    getTrxType() {
        this.trxTypeResult = this.trxtypeService.getListsByTrxClass('I');
        this.trxTypeResult.subscribe(val => {this.trxTypes = val});
    }

    saveAddItem(): void {
    }

    saveUpdateItem(id): void {
    }

    saveDeleteItem(id): void {
    }

    onChanges(): void {
        this.invoice_payment_form.get('lot').valueChanges.subscribe(val => {
            this.filterChanged();
        });

        this.invoice_payment_form.get('trxTypeInv').valueChanges.subscribe(val => {
            this.filterChanged();
        });
    }

    changeChecked(newItem){
        let updateItem = this.invoices.find(this.findIndexToUpdate, newItem.id);        
        let index = this.invoices.indexOf(updateItem);
        if (newItem.checked) {
            newItem.paymentAmt = newItem.agingIncUnpost;
            newItem.discountAmt = 0;
        } else {
            newItem.paymentAmt = 0;
            newItem.discountAmt = 0;
        }
        
        this.invoices[index] = newItem;        
        this.calcTotal();
    }

    changeDiscount(newItem){
        let updateItem = this.invoices.find(this.findIndexToUpdate, newItem.id);        
        let index = this.invoices.indexOf(updateItem);
        newItem.paymentAmt = newItem.agingIncUnpost - newItem.discountAmt;
        this.invoices[index] = newItem;
        this.calcTotal();
    }
      
    findIndexToUpdate(newItem) { 
        return newItem.id === this;
    }

    calcTotal() {
        let totalPay = 0;
        let totalDiscount = 0;
        for (let invoice of this.invoices) {
            if (invoice.checked) {
                totalPay += invoice.paymentAmt;
                totalDiscount += invoice.discountAmt;
            }
        }
        this.invoice_payment_form.controls['docAmt'].setValue(totalPay);
        this.invoice_payment_form.controls['discountAmt'].setValue(totalDiscount);
    }

    filterChanged() {
        let lot = this.invoice_payment_form.controls['lot'].value;
        let trxType = this.invoice_payment_form.controls['trxTypeInv'].value;

        if (lot && trxType) {
            this.result = this.invoiceService.getAgingbyLotAndTrxType(lot, trxType);
            this.result.subscribe(val => {this.invoices = val; this.dtTrigger.next()});
        }
    }

    payment(): void {
        let oPayment = new PaymentInvByLot();
        let oPaymentDetail: PaymentInvByLotDetail;
        let totalPay: number = 0;
        let totalDiscount: number = 0;
        oPayment.lot = this.invoice_payment_form.controls['lot'].value;
        oPayment.trxTypeInv = this.invoice_payment_form.controls['trxTypeInv'].value;
        oPayment.docAmt = this.invoice_payment_form.controls['docAmt'].value;
        oPayment.discountAmt = this.invoice_payment_form.controls['discountAmt'].value;
        for (let invoice of this.invoices) {
            if (invoice.checked) {
                if (invoice.paymentAmt + invoice.discountAmt > invoice.agingIncUnpost) {
                    this.toastr.error("Pembaran tidak boleh lebih besar dari Aging");
                }
                oPaymentDetail = new PaymentInvByLotDetail();
                oPaymentDetail.inv = invoice.id;
                oPaymentDetail.docAmt = invoice.paymentAmt;
                oPaymentDetail.discountAmt = invoice.discountAmt;
                totalPay += invoice.paymentAmt;
                totalDiscount += invoice.discountAmt;
                oPayment.paymentDetails.push(oPaymentDetail);
            }
        }


        if (this.invoice_payment_form.controls['docAmt'].value !== totalPay) {
            this.toastr.error("Total Amount Tidak sama dengan Total Pembayaran");
        } else {
            this.invoicePaymentService.savePaymentByLot(oPayment).subscribe(
                success => {
                    this.toastr.success("Data Anda Berhasil Di simpan", "Success");
                    this.invoice_payment_form.reset();
                    this.invoices = [];
                    console.log(success);
                },
                error => {
                    let j_message = JSON.parse(error._body);
                    this.toastr.error(j_message.error_message);
                });                                
        }
    }
}

