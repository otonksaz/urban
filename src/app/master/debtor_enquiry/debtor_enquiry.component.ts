import {BaseComponent} from '../base.component';
import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Invoice} from '../../models/invoice';
import {Alloc} from '../../models/alloc';
import {Lot} from '../../models/lot';
import {InvoicePaymentService} from '../../services/invoice_payment.service';
import {InvoiceService} from '../../services/invoice.service';
import {LotService} from '../../services/lot.service';
import {Tenant} from "../../models/tenant";
import {KtpService} from "../../services/ktp.service";
import {DataTableDirective} from "angular-datatables";

@Component({
  templateUrl: 'debtor_enquiry.component.html',
  providers: [InvoicePaymentService, InvoiceService, LotService, KtpService]
})

export class DebtorEnquiryComponent extends BaseComponent implements OnInit, AfterViewInit  {

  debtorInquiry_form: FormGroup;
  lotResult: Observable<Lot[]>;
  invoices: Invoice[] = [];
  allocs: Alloc[] = [];
  lots: Lot[]=[];
  lot: Lot;
  tenants: Tenant[] = [];
  tag: string ="tenant";
  selected_lot: number;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  dtOptions2: DataTables.Settings[] = [];

  constructor(
    private invoicePaymentService: InvoicePaymentService,
    private invoiceService: InvoiceService,
    private lotService: LotService,
    private ktpService: KtpService,
    private routerDebtorEnquiry: Router,
    private routeDebtorEnquiry: ActivatedRoute,
    private toastrDebtorEnquiry: ToastrService,
    private formBuilder: FormBuilder
  ) {
    super(routerDebtorEnquiry, routeDebtorEnquiry, toastrDebtorEnquiry)
    this.router = routerDebtorEnquiry;
    this.route = routeDebtorEnquiry;
    this.toastr = toastrDebtorEnquiry;
    this.IService = this;
    this.debtorInquiry_form = formBuilder.group({
      lot: [this.lot, Validators.required]
    });
    this.url = "master/debtorinquiry";
  }

  ngOnInit(): void {
    this.init();
    this.getLots();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
    this.dtTrigger_reserved.next()
    this.dtTrigger_reserved2.next()
  }

  getLots() {
    this.lotResult = this.lotService.getLists();
    this.lotResult.subscribe(val => {this.lots = val});
  }

  saveAddItem(): void {
  }


  saveUpdateItem(id): void {
  }

  saveDeleteItem(id): void {
  }

  filterChanged(){
    this.tenants = [];
    this.invoices = [];
    this.allocs = [];

    console.log(this.dtElements);
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        dtInstance.destroy();
      });
    });
    this.lotService.getById(this.selected_lot).subscribe(lot => {
      this.lot = lot;
      if(lot.kks.length == 0) {
        this.dtTrigger.next(true);
      }
      for(let i = 0; i < lot.kks.length; i++) {
        var kk_details = lot.kks[i].kkDetails;
        for(let j = 0; j < kk_details.length; j++) {
          this.ktpService.getById(kk_details[j].ktp).subscribe(data => {
            let tenant = {
              "no_kk": lot.kks[i].kkNo,
              "relation": kk_details[j].familyRelationDescs,
              "nik": kk_details[j].nik,
              "name": data.name,
              "religion": data.religionDescs,
              "birth_date": data.birthDate
            }
            this.tenants.push(tenant)
            if(i == (lot.kks.length - 1) && j == (kk_details.length - 1)) {
              this.dtTrigger.next(true);
            }
          });
        }
      }

      this.getInvoice();
      this.getPayment();
    })
  }

  changeTab(param) {
    this.tag = param;
  }

  getTenant() {

  }

  getInvoice(){
    if(this.lot){
      this.invoiceService.getInvoicesbyLot(this.lot.id).subscribe(val => {
        this.invoices = val;
        // this.dtTrigger.next(true);
        this.dtTrigger_reserved.next()
      });

    }
  }

  getPayment(){
    if(this.lot){
      this.invoicePaymentService.getAllocsbyLot(this.lot.id).subscribe(val => {
        this.allocs = val;
        // this.dtTrigger_reserved2.next()
        this.dtTrigger_reserved2.next(true)
      });

    }
  }
}
