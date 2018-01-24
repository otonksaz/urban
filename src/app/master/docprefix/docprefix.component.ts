import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Docprefix} from '../../models/docprefix';
import {DocprefixService} from '../../services/docprefix.service';
import {IntervalTypeOptions} from '../../constant/option'
import {Option} from '../../models/option';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'docprefix.component.html',
    providers: [DocprefixService]
})

export class DocprefixComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    docprefix_form: FormGroup;
    result: Observable<Docprefix[]>;
    docprefixs: Docprefix[] = [];
    data: Docprefix;
    intervalTypeOptions: Option[] = [];

    constructor(
        private docprefixService : DocprefixService,
        private routerDocprefix: Router,
        private routeDocprefix: ActivatedRoute,
        private toastrDocprefix : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerDocprefix, routeDocprefix, toastrDocprefix)
        this.router = routerDocprefix
        this.route = routeDocprefix
        this.toastr = toastrDocprefix
        this.IService = this;
        this.docprefix_form = formBuilder.group({
            prefix: ["", Validators.required],
            descs: ["", Validators.required],
            docFormat: ["", Validators.required],
            docReset: ["", Validators.required]
        });

        this.url = "master/docprefix";
    }

    ngOnInit(): void {

        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.docprefixService.getById(this.id).subscribe(data => {
                    this.data = data;
                    this.docprefix_form = this.formBuilder.group({
                        prefix: [this.data.prefix, Validators.required],
                        descs: [this.data.descs, Validators.required],
                        docFormat: [this.data.docFormat, Validators.required],
                        docReset: [this.data.docReset, Validators.required]
                    });
                });
                this.intervalTypeOptions = IntervalTypeOptions
            }
        } else {
            this.result = this.docprefixService.getLists();
            this.result.subscribe(val => {this.docprefixs = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.docprefixService.save(this.docprefix_form.value).subscribe(
          success => {
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(id): void {
        this.docprefixService.update(id, this.docprefix_form.value).subscribe(
          success => {
            this.docprefixService.getLists().subscribe(val => {this.docprefixs = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.docprefixService.delete(id).subscribe(
              success => {
                this.docprefixService.getLists().subscribe(val => {this.docprefixs = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.error_message);
              });
        };
    }
}


