import {Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {ReportService} from '../../services/report.service';
import {RWService} from '../../services/rw.service';
import {RTService} from '../../services/rt.service';
import {Observable} from 'rxjs/Observable';
import {ReportInvoice} from '../../models/reportInvoice';
import {RW} from '../../models/rw';
import {RT} from '../../models/rt';
import {Subject} from 'rxjs/Subject';

@Component({
    templateUrl: 'reportInvoice.component.html',
    providers: [ReportService, RWService, RTService]
})

export class ReportInvoiceComponent implements OnInit, AfterViewInit {
    result: Observable<ReportInvoice[]>;
    invoices: ReportInvoice[] = [];
    data: ReportInvoice;
    rtNo: string;
    rwNo: string;
    rws: RW[] = [];
    rts: RT[] = [];
    startDate: string;
    endDate: string;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    receiptType: string = 'A';
    reportType: string;
    sub: any;

    rwResult: Observable<RW[]>;
    rtResult: Observable<RT[]>;

    constructor(
        private reportService: ReportService,
        private rwService: RWService,
        private rtService: RTService,
        protected curRoute?: ActivatedRoute,
    ) {
        this.rtNo = '';
        this.rwNo = '';
        this.startDate = '';
        this.endDate = '';
    }

    ngOnInit(): void {
        this.getRTList();
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };

        this.sub = this.curRoute.params.subscribe(params => {
            this.reportType = params['reportType'];
        });
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    getReport(): void {
        if (this.rtNo === null) 
            this.rtNo = ""
        if (this.reportType == 'receipt') {
            this.reportService.getReceiptReport(this.rtNo, this.startDate, this.endDate, this.receiptType)
                .subscribe((res) => {
                    var fileURL = URL.createObjectURL(res);
                    window.open(fileURL);     
                },
                error => {
                    console.log(error);
                });
        }else {
            this.reportService.getInvoiceReport(this.rtNo, this.startDate, this.endDate)
                .subscribe((res) => {
                    var fileURL = URL.createObjectURL(res);
                    window.open(fileURL);     
                },
                error => {
                    console.log(error);
                });
        }
    }

    getRWList() {
        this.rwResult = this.rwService.getLists();
        this.rwResult.subscribe(val => {this.rws = val});
    }

    getRTList() {
        this.rtResult = this.rtService.getLists();
        this.rtResult.subscribe(val => {this.rts = val});
    }
}


