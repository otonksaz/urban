import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {RWService} from '../../services/rw.service';
import {Observable} from 'rxjs/Observable';
import {RW} from '../../models/rw';
import {IBaseTrxInterface} from "../base.trx.interface";
import {BaseTrxComponent} from "../base.trx.component";


@Component({
    templateUrl: 'rw.component.html',
    providers: [RWService]
})

export class RWComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    rw_form: FormGroup;
    result: Observable<RW[]>;
    rws: RW[] = [];
    data: RW;

    constructor(
        private rwService: RWService,
        private routerRW: Router,
        private routeRW: ActivatedRoute,
        private toastrRW : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerRW, routeRW, toastrRW)
        this.router = routerRW
        this.route = routeRW
        this.toastr = toastrRW
        this.IService = this;
        this.rw_form = formBuilder.group({
            rwNo: ["", Validators.required],
            rwDescs: ["", ""]
        });

        this.url = "master/rw";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE) {
            this.rwService.getById(this.id).subscribe(data => {
              this.data = data;
              this.rw_form = this.formBuilder.group({
                  rwNo: [this.data.rwNo, Validators.required],
                  rwDescs: [this.data.rwDescs, ""]
              });
            });
        } else {
            this.result = this.rwService.getLists();
            this.result.subscribe(val => {
              this.rws = val;
              this.dtTrigger.next()
            });
        }
    }

    saveAddItem(): void {
        this.rwService.save(this.rw_form.value)
        .subscribe(
          success => {
                this.rwService.getLists().subscribe(val => {this.rws = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(url): void {
        this.rwService.update(url, this.rw_form.value).subscribe(
          success => {
            this.rwService.getLists().subscribe(val => {this.rws = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = error.error;
            this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.rwService.delete(url).subscribe(
              success => {
                this.rwService.getLists().subscribe(val => {this.rws = val})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
              });
        };
    }
}


