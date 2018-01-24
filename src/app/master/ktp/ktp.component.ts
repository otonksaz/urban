import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Ktp} from '../../models/ktp';
import {Option} from '../../models/option';
import {KtpService} from '../../services/ktp.service';
import {OptionService} from '../../services/option.service';
import {GenderOptions, ReligionOptions, MaritalStatusOptions, NationalityOptions, BloodTypeOptions} from '../../constant/option'
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'ktp.component.html',
    providers: [KtpService, OptionService]
})

export class KtpComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    ktp_form: FormGroup;
    result: Observable<Ktp[]>;
    ktps: Ktp[] = [];
    professionResult: Observable<Option[]>;
    professions: Option[] = [];
    data: Ktp;
    genderOptions: Option[] = [];
    religionOptions: Option[] = [];
    maritalStatusOptions: Option[] = [];
    bloodTypeOptions: Option[] = [];
    nationalityOptions: Option[] = [];

    constructor(
        private ktpService : KtpService,
        private optionService : OptionService,
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
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.ktpService.getById(this.id).subscribe(data => {
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
            }
            this.getProfessions();
            this.genderOptions = GenderOptions;
            this.religionOptions = ReligionOptions;
            this.maritalStatusOptions = MaritalStatusOptions;
            this.bloodTypeOptions = BloodTypeOptions;
            this.nationalityOptions = NationalityOptions;
        } else {
            this.result = this.ktpService.getLists();
            this.result.subscribe(val => {console.log(this.ktps); this.ktps = val; this.dtTrigger.next()});
        }
    }

    getProfessions(): void {
        this.professionResult = this.optionService.getProffesions();
        this.professionResult.subscribe(val => {this.professions = val});
    }

    saveAddItem(): void {
        this.ktpService.save(this.ktp_form.value).subscribe(
          success => {
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(id): void {
        this.ktpService.update(id, this.ktp_form.value).subscribe(
          success => {
            this.ktpService.getLists().subscribe(val => {this.ktps = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.ktpService.delete(id).subscribe(
              success => {
                this.ktpService.getLists().subscribe(val => {this.ktps = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.error_message);
              });
        };
    }
}


