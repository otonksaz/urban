import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {PaymentUnpostService} from '../services/payment_unpost.service';
import {Observable} from 'rxjs/Observable';
import {PaymentUnpost} from '../models/payment_unpost';
import {Alloc} from '../models/alloc';
import {Subject} from 'rxjs/Subject';

@Component({
    templateUrl: 'kwitansi.component.html',
    providers: [PaymentUnpostService]
})

export class KwitansiComponent implements OnInit {
    today = new Date();
    data: PaymentUnpost = { lotNo:"", docDate: this.today, docAmt: 0, owner: "", terbilang: "", aralloctmp_set:[] };
    sub: any;
    id: string;

    constructor(
        private route: ActivatedRoute,
        private paymentUnpostService: PaymentUnpostService
    ) {}

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            
            this.paymentUnpostService.getById(this.id).subscribe(data => {
                this.data = data;
                //console.log(this.data);
                this.paymentUnpostService.setAsPrinted(this.data).subscribe(data => {
                    //console.log(data);
                });
              });
          })
    }
}


