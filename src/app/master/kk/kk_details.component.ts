import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {KKDetailsService} from '../../services/kk_details.service';
import {KtpService} from '../../services/ktp.service';
import {KKService} from '../../services/kk.service';
import {Observable} from 'rxjs/Observable';
import {KKDetails} from '../../models/kk_details';
import {KK} from '../../models/kk';
import {Ktp} from '../../models/ktp';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'kk_details.component.html',
    providers: [KKDetailsService, KKService, KtpService]
})

export class KKDetailsComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    kk_details_form: FormGroup;
    result: Observable<KKDetails[]>;
    kk_details: KKDetails[] = [];
    data: KKDetails;
    kk: KK;
    kkNo: string;
    ktpResult: Observable<Ktp[]>;
    ktps: Ktp[] = [];

    constructor(
        private kkDetailsService: KKDetailsService,
        private kkService: KKService,
        private ktpService: KtpService,
        private routerKK: Router,
        private routeKK: ActivatedRoute,
        private toastrKK: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerKK, routeKK, toastrKK)
        this.router = routerKK
        this.route = routeKK
        this.toastr = toastrKK
        this.IService = this

        this.kk_details_form = formBuilder.group({
            education: ["", Validators.required],
            fatherName: ["", Validators.required],
            motherName: ["", Validators.required],
            familyRelation: ["", Validators.required],
            kk: ["", Validators.required],
            ktp: ["", Validators.required]
        });
    }

    ngOnInit(): void {
        this.init();

        this.sub = this.route.params.subscribe(params => {
            this.kkNo = params['kk'];
        });
        this.kk_details_form.controls['kk'].setValue(this.kkNo);

        this.url = "master/kk_details/" + this.kkNo;

        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.kkDetailsService.getById(this.id).subscribe(data => {
                    this.data = data;
                    this.kk_details_form = this.formBuilder.group({
                        education: [this.data.education, Validators.required],
                        fatherName: [this.data.fatherName, Validators.required],
                        motherName: [this.data.motherName, Validators.required],
                        familyRelation: [this.data.familyRelation, Validators.required],
                        kk: [this.data.kk, Validators.required],
                        ktp: [this.data.ktp, Validators.required]
                    });
                });
            }
                this.getKtpList();
        } else {
            this.kkService.getById(this.kkNo).then(data => {
                this.kk = data;
            });
            this.result = this.kkDetailsService.getKKLists(this.kkNo);
            this.result.subscribe(val => {this.kk_details = val; this.dtTrigger.next();});

        }
    }

    getKtpList() {
        this.ktpResult = this.ktpService.getLists();
        this.ktpResult.subscribe(val => {this.ktps = val});
    }

    saveAddItem(): void {
        this.kkDetailsService.save(this.kk_details_form.value).subscribe(
          success => {
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(url): void {
        this.kkDetailsService.update(url, this.kk_details_form.value).subscribe(
          success => {
            this.kkDetailsService.getLists().subscribe(val => {this.kk_details = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.kkDetailsService.delete(url).subscribe(
              success => {
                this.kkDetailsService.getLists().subscribe(val => {this.kk_details = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.error_message);
              });
        };
    }
}
