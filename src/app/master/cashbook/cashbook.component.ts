import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Cashbook} from '../../models/cashbook';
import {CashbookService} from '../../services/cashbook.service';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";
import {Trxtype} from "../../models/trxtype";
import {TrxtypeService} from "../../services/trxtype.service";

@Component({
  templateUrl: 'cashbook.component.html',
  providers: [CashbookService, TrxtypeService]
})

export class CashbookComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

  cashbook_form: FormGroup;
  result: Observable<Cashbook[]>;
  cashbooks: Cashbook[] = [];
  data: Cashbook;

  trxModes: Trxtype[] = [];

  constructor(
    private cashbookService: CashbookService,
    private trxtypeService: TrxtypeService,
    private routerCashbook: Router,
    private routeCashbook: ActivatedRoute,
    private toastrCashbook: ToastrService,
    private formBuilder: FormBuilder
  ) {
    super(routerCashbook, routeCashbook, toastrCashbook)
    this.router = routerCashbook
    this.route = routeCashbook
    this.toastr = toastrCashbook
    this.IService = this;
    this.cashbook_form = formBuilder.group({
      docNo: ["", Validators.required],
      trxDate: ["", Validators.required],
      docDate: ["", Validators.required],
      trxMode: ["", Validators.required],
      descs: ["", Validators.required],
      refNo: ["", Validators.required],
      docAmt: ["", Validators.required],
      module: "CB"
    });

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
          descs: [this.data.descs, Validators.required],
          refNo: [this.data.refNo, Validators.required],
          docAmt: [this.data.docAmt, Validators.required],
          module: "CB"
        });

      });
    } else {
      this.result = this.cashbookService.getLists();
      this.result.subscribe(val => {console.log(val);this.cashbooks = val; this.dtTrigger.next()});
    }
    this.getTrxTypes();
  }

  saveAddItem(): void {
    this.cashbookService.save(this.cashbook_form.value).subscribe(
      success => {
        this.cashbookService.getLists().subscribe(val => {this.cashbooks = val; this.dtTrigger.next()})
        this.onSuccess("Data Anda Berhasil Di simpan");
      },
      error => {
        let j_message = JSON.parse(error._body);
        this.onError(j_message.error_message);
      });
  }

  saveUpdateItem(id): void {
    this.cashbookService.update(id, this.cashbook_form.value).subscribe(
      success => {
        this.cashbookService.getLists().subscribe(val => {this.cashbooks = val; this.dtTrigger.next()})
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
          this.cashbookService.getLists().subscribe(val => {this.cashbooks = val})
          this.onSuccess("Data Anda Berhasil Di hapus");
        },
        error => {
          let j_message = error.error;
          this.onError(j_message.error_message);
        });
    };
  }

  getTrxTypes() {
    console.log("+++++++++++++++++++");
    this.trxtypeService.getLists().subscribe(val => {console.log(val); this.trxModes = val});
  }
}


