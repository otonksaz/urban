import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Ktp} from '../../models/ktp';
import {KtpService} from '../../services/ktp.service';

@Component({
    templateUrl: 'ktp.component.html',
    providers: [KtpService]
})

export class KtpComponent extends BaseComponent implements OnInit, IBaseInterface {
    
    ktp_form: FormGroup;
    result: Observable<Ktp[]>;
    ktps: Ktp[] = [];
    data: Ktp;

    constructor(
        private ktpService : KtpService,
        private routerKtp: Router,
        private routeKtp: ActivatedRoute,
        private toastrKtp : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerKtp, routeKtp, toastrKtp)
        this.router = routerKtp
        this.route = routeKtp
        this.toastr = toastrKtp
        this.IService = this;
        this.ktp_form = formBuilder.group({
            nik: ["", Validators.required],
            name: ["", Validators.required],
            birthPlace: ["", Validators.required],
            birthDate: ["", Validators.required],
            sex: ["", Validators.required],
            religion: ["", Validators.required],
            marital: ["", Validators.required],
            nationality: ["", Validators.required],
            bloodType: ["", Validators.required],
            profession: ["", Validators.required]
        });
        
        this.url = "master/ktp";
    }

    ngOnInit(): void {
        
        this.init();
        if (this.method == this.ACTION_UPDATE) {
            this.ktpService.getKtp(this.id).then(data => {
                this.data = data;
                this.ktp_form = this.formBuilder.group({
                    nik: [this.data.nik, Validators.required],
                    name: [this.data.name, Validators.required],
                    birthPlace: [this.data.birthPlace, Validators.required],
                    birthDate: [this.data.birthDate, Validators.required],
                    sex: [this.data.sex, Validators.required],
                    religion: [this.data.religion, Validators.required],
                    marital: [this.data.marital, Validators.required],
                    nationality: [this.data.nationality, Validators.required],
                    bloodType: [this.data.bloodType, Validators.required],
                    profession: [this.data.profession, Validators.required],
                });
            });
        } else {
            this.result = this.ktpService.getKtpList();
            this.result.subscribe(val => {this.ktps = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.ktpService.addKtp(this.ktp_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(id): void {
        this.ktpService.updateKtp(id, this.ktp_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.ktpService.deleteKtp(id).subscribe(
                error => console.log(error)
            );
        };
    }
}


