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
import {MsUser} from '../../models/ms_user';
import {UserService} from '../../services/user.service';

@Component({
    templateUrl: 'paymentapprove.component.html',
    providers: [PaymentUnpostService, UserService]
})

export class PaymentApproveComponent extends BaseComponent implements OnInit {

    invoice_payment_form: FormGroup;
    result: Observable<PaymentUnpost[]>;
    paymentUnposts: PaymentUnpost[] = [];
    resultUser: Observable<MsUser[]>;
    users: MsUser[];
    selected_user: number;
    checkAll: boolean;
    totalPay: number;

    constructor(
        private paymentUnpostService: PaymentUnpostService,
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
        this.invoice_payment_form = formBuilder.group({            
            user: [""],
        });

        this.url = "master/paymentunpost";
    }

    ngOnInit(): void {
        this.init();
        this.getUsers();
    }

    getUsers() {
        this.resultUser = this.userService.getLists();
        this.resultUser.subscribe(val => {this.users = val});
    }

    changeUser() {
        this.result = this.paymentUnpostService.getByUser(this.selected_user);
        this.result.subscribe(val => {this.paymentUnposts = val; this.dtTrigger.next()});
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
        this.totalPay = totalPay;
    }

    changeChecked() {
        this.calcTotal();
    }

    approve(): void {
        for (let paymentUnpost of this.paymentUnposts) {
            if (paymentUnpost.checked) {                
                var oPayment = new Id();
                oPayment.id = paymentUnpost.id;
                this.paymentUnpostService.doApprove(oPayment).subscribe(
                    success => {
                        this.toastr.success("Payment Approved", "Success");
                        this.invoice_payment_form.reset();
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

    reject(): void {
        for (let paymentUnpost of this.paymentUnposts) {
            if (paymentUnpost.checked) {  
                this.paymentUnpostService.doReject(paymentUnpost.id).subscribe(
                    success => {
                        this.toastr.success("Payment Rejected", "Success");
                        this.invoice_payment_form.reset();
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


