import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PaymentApproveService} from '../services/payment_approve.service';
import {Observable} from 'rxjs/Observable';
import {PaymentApprove} from '../models/payment_approve';
import {Subject} from 'rxjs/Subject';

@Component({
    templateUrl: 'tandaterima.component.html',
    providers: [PaymentApproveService]
})

export class TandaTerimaComponent implements OnInit {
    today = new Date();
    data: PaymentApprove = { userCollectName:"", startDate : this.today, endDate : this.today, docDate: this.today, docAmt: 0, terbilang: "", arLedgers:[]};
    sub: any;
    id: string;

    constructor(
        private route: ActivatedRoute,
        private paymentApproveService: PaymentApproveService
    ) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            
            this.paymentApproveService.getById(this.id).subscribe(data => {
                this.data = data;
                console.log(this.data);
              });
          })
    }
}


