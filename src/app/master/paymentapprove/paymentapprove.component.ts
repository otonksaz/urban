import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {PaymentUnpost} from '../../models/payment_unpost';
import {Id} from '../../models/id';
import {PaymentUnpostService} from '../../services/payment_unpost.service';
import {PaymentApproveService} from '../../services/payment_approve.service';
import {MsUser} from '../../models/ms_user';
import {UserService} from '../../services/user.service';
import { PaymentApproveForm } from '../../models/payment_approve'

@Component({
    templateUrl: 'paymentapprove.component.html',
    providers: [PaymentUnpostService, UserService, PaymentApproveService]
})

export class PaymentApproveComponent extends BaseComponent implements OnInit {
    form: FormGroup;
    result: Observable<PaymentUnpost[]>;
    paymentUnposts: PaymentUnpost[] = [];
    resultUser: Observable<MsUser[]>;
    users: MsUser[];
    checkAll: boolean;
    totalPayFormat: string = "0";

    constructor(
        private paymentUnpostService: PaymentUnpostService,
        private paymentApproveService: PaymentApproveService,
        private userService: UserService,
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
        this.form = formBuilder.group({            
            userCollect: ["", Validators.required],
            startDate:["", Validators.required],
            endDate:["", Validators.required],
            docAmt:["", Validators.required],
            totalPay:["", Validators.required],
            descs:[""]
        });
        this.onChanges();
        this.url = "master/paymentunpost";
    }

    ngOnInit(): void {
        this.init();
        this.getUsers();
    }

    onChanges(): void {
        this.form.get('userCollect').valueChanges.subscribe(val => {
            this.changeFilter();
        });

        this.form.get('startDate').valueChanges.subscribe(val => {
            this.changeFilter();
        });

        this.form.get('endDate').valueChanges.subscribe(val => {
            this.changeFilter();
        });
    }

    getUsers() {
        this.resultUser = this.userService.getLists();
        this.resultUser.subscribe(val => {this.users = val});
    }

    changeUser(userId) {
        this.result = this.paymentUnpostService.getByUser(userId);
        this.result.subscribe(val => {this.paymentUnposts = val; this.dtTrigger.next()});
    }

    changeFilter() {
        let user = this.form.controls['userCollect'].value;
        let startDate = this.form.controls['startDate'].value;
        let endDate = this.form.controls['endDate'].value;

        if (user && startDate && endDate) {
            this.result = this.paymentUnpostService.getByUserAndDateRange(user, startDate, endDate);
            this.result.subscribe(val => {this.paymentUnposts = val; this.dtTrigger.next()});

            this.form.controls['descs'].setValue("Iuran dari tanggal " + startDate + " s/d " + endDate);
        }
    }

    doCheckAll() {
        for (let paymentUnpost of this.paymentUnposts) {
            paymentUnpost.checked = this.checkAll;
        }
        this.calcTotal();
    }

    saveAddItem(): void {
    }

    saveUpdateItem(id): void {
    }

    saveDeleteItem(id): void {
    }

    doAction(act){
        if (act == 'approve')
            this.approve();
        else if (act == 'reject')
            this.reject();
    }

    calcTotal() {
        let totalPay = 0;
        let currVal = 0;
        for (let paymentUnpost of this.paymentUnposts) {
            if (paymentUnpost.checked) {
                currVal = paymentUnpost.docAmt * 1;
                totalPay += currVal;
            }
        }
        this.form.controls['docAmt'].setValue(totalPay);
        this.totalPayFormat = totalPay.toLocaleString(undefined, {maximumFractionDigits:2});
        console.log(this.totalPayFormat);
    }

    changeChecked() {
        this.calcTotal();
    }

    approve(): void {
        let paymentApprove = new PaymentApproveForm();
        let oPayment: Id;
        let totalPay: number = 0;

        paymentApprove.userCollect = this.form.controls['userCollect'].value;
        paymentApprove.startDate = this.form.controls['startDate'].value;
        paymentApprove.endDate = this.form.controls['endDate'].value;
        paymentApprove.docAmt = this.form.controls['docAmt'].value;
        paymentApprove.descs = this.form.controls['descs'].value;

        for (let paymentUnpost of this.paymentUnposts) {
            if (paymentUnpost.checked) {
                oPayment = new Id();                            
                oPayment.id = paymentUnpost.id;                

                totalPay += (paymentUnpost.docAmt * 1);
                paymentApprove.paymentApproveDetails.push(oPayment);
            }
        }

        if (this.form.controls['docAmt'].value !== totalPay) {
            this.toastr.error("Total Amount Tidak sama dengan Total Pembayaran");
            return;
        } else {
            this.paymentUnpostService.doApprove(paymentApprove).subscribe(
                success => {
                    this.toastr.success("Payment Approved", "Success");
                    this.form.reset();
                    this.paymentUnposts = [];
                    //this.router.navigate(['tandaterima', success.id]);
                    this.paymentApproveService.tandaTerima(success.id)
                        .subscribe((res) => {
                            var fileURL = URL.createObjectURL(res);
                            window.open(fileURL);    
                        },
                        error => {
                            console.log(error);
                        });
                },
                error => {
                    let j_message = error.error;
                    this.toastr.error(j_message.error_message);
                });
        }
    }

    reject(): void {
        for (let paymentUnpost of this.paymentUnposts) {
            if (paymentUnpost.checked) {  
                this.paymentUnpostService.doReject(paymentUnpost.id).subscribe(
                    success => {
                        this.toastr.success("Payment Rejected", "Success");
                        this.form.reset();
                        let index: number = this.paymentUnposts.indexOf(paymentUnpost);
                        if (index !== -1) {
                            this.paymentUnposts.splice(index, 1);
                        }
                        console.log(success);
                    },
                    error => {
                        let j_message = error.error;
                        this.toastr.error(j_message.error_message);
                    });
            }
        }
    }
}
