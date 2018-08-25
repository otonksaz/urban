import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Cashbook} from '../../models/cashbook';
import {CashbookService} from '../../services/cashbook.service';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";
import {Activity} from "../../models/activity";
import {ActivityService} from "../../services/activity.service";
import {Month, Year} from "../../models/date";
import {DateService} from "../../services/date.service";
import {DataTableDirective} from "angular-datatables";

@Component({
  templateUrl: 'cashbook.component.html',
  providers: [CashbookService, DateService, ActivityService]
})

export class CashbookComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

  cashbook_form: FormGroup;
  result: Observable<Cashbook[]>;
  cashbooks: Cashbook[] = [];
  data: Cashbook;
  activities: Activity[] = [];
  months: Month[] = [];
  years: Year[] = [];
  month_selected: number;
  year_selected: number;

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  constructor(
    private cashbookService: CashbookService,
    private activityService: ActivityService,
    private routerCashbook: Router,
    private routeCashbook: ActivatedRoute,
    private toastrCashbook: ToastrService,
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {
    super(routerCashbook, routeCashbook, toastrCashbook)
    this.router = routerCashbook
    this.route = routeCashbook
    this.toastr = toastrCashbook
    this.IService = this;
    this.cashbook_form = formBuilder.group({
      trxDate: ["", Validators.required],
      docDate: ["", Validators.required],
      trxMode: ["", Validators.required],
      activity: ["", Validators.required],
      descs: ["", Validators.required],
      refNo: ["", Validators.required],
      docAmt: ["", Validators.required],
      module: "CB"
    });

    let today = new Date();

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();
    
    this.month_selected = today.getMonth() + 1;
    this.year_selected = today.getFullYear();

    this.url = "master/cashbook";
  }

  ngOnInit(): void {

    this.init();
    if (this.method == this.ACTION_UPDATE) {
      this.cashbookService.getById(this.id).subscribe(data => {
        this.data = data;
        this.cashbook_form = this.formBuilder.group({
          docNo: [this.data.docNo, Validators.required],
          trxDate: [this.data.trxDate, Validators.required],
          docDate: [this.data.docDate, Validators.required],
          trxMode: [this.data.trxMode, Validators.required],
          activity: [this.data.activity, Validators.required],
          descs: [this.data.descs, Validators.required],
          refNo: [this.data.refNo, Validators.required],
          docAmt: [this.data.docAmt, Validators.required],
          module: "CB"
        });
        this.getActivities(this.data.trxMode);
      });
    } else {
      /*
      this.result = this.cashbookService.getLists();
      this.result.subscribe(val => {console.log(val);this.cashbooks = val; this.dtTrigger.next()});
      */
      this.changeFilter(true);
    }

    this.onChanges();
  }

  onChanges(): void {
    this.cashbook_form.get('trxMode').valueChanges.subscribe(val => {
      this.getActivities(val);        
    });
  }

  saveAddItem(): void {
    this.cashbookService.save(this.cashbook_form.value).subscribe(
      success => {
        //this.cashbookService.getLists().subscribe(val => {this.cashbooks = val; this.dtTrigger.next()})
        this.changeFilter();
        this.onSuccess("Data Anda Berhasil Di simpan");
      },
      error => {        
        let j_message = error.error;
        this.onError(j_message.error_message);        
      });
  }

  saveUpdateItem(id): void {
    this.cashbookService.update(id, this.cashbook_form.value).subscribe(
      success => {
        //this.cashbookService.getLists().subscribe(val => {this.cashbooks = val; this.dtTrigger.next()})
        this.changeFilter();
        this.onSuccess("Data Anda Berhasil Di simpan");
      },
      error => {
        let j_message = error.error;
        this.onError(j_message.error_message);
      });
  }

  saveDeleteItem(id): void {
    if (confirm("Apakah Anda yakin akan menghapus data")) {
      this.cashbookService.delete(id).subscribe(
        success => {
          //this.cashbookService.getLists().subscribe(val => {this.cashbooks = val})
          this.changeFilter();
          this.onSuccess("Data Anda Berhasil Di Hapus");
        },
        error => {
          let j_message = error.error;
          this.onError(j_message.error_message);
        });
    };
  }

  changeFilter(isInitialized = false) {
    let startDate = new Date(this.year_selected, this.month_selected - 1, 1);
    let endDate = new Date(this.year_selected, this.month_selected, 0);
    let stStartDate = startDate.getFullYear().toString() + "-" + (startDate.getMonth() + 1).toString() + "-1";
    let stEndDate = endDate.getFullYear().toString() + "-" + (endDate.getMonth() + 1).toString() + "-" + endDate.getDate().toString();

    if (this.dtElements != undefined) {
      console.log(this.dtElements)
      this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
        dtElement.dtInstance.then((dtInstance: any) => {
          dtInstance.destroy();
        });
      });
    }

    this.result = this.cashbookService.getListsByPeriod(stStartDate, stEndDate);
    if (isInitialized) {
      this.result.subscribe(val => {this.cashbooks = val; this.dtTrigger.next()});
    }else{
      this.result.subscribe(val => {this.cashbooks = val; this.dtTrigger.next()});
    }
  }

  getActivities(trxMode: string) {
    let type :string = 'I';
    if (trxMode == 'D') {
      type = 'I';
    }else if (trxMode == 'C') {
      type = 'O';
    }   
    this.activityService.getByType(type).subscribe(val => {this.activities = val}); 
  }
}


