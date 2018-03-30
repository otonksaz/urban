import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Activity} from '../../models/activity';
import {ActivityService} from '../../services/activity.service';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'activity.component.html',
    providers: [ActivityService]
})

export class ActivityComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    activity_form: FormGroup;
    result: Observable<Activity[]>;
    activities: Activity[] = [];
    data: Activity;

    constructor(
        private activityService: ActivityService,
        private routerActivity: Router,
        private routeActivity: ActivatedRoute,
        private toastrActivity: ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerActivity, routeActivity, toastrActivity)
        this.router = routerActivity
        this.route = routeActivity
        this.toastr = toastrActivity
        this.IService = this;
        this.activity_form = formBuilder.group({
            activityCd: ["", Validators.required],
            name: ["", Validators.required],
            type: ["", Validators.required]
        });

        this.url = "master/activity";
    }

    ngOnInit(): void {

        this.init();
        if (this.method == this.ACTION_UPDATE) {
            this.activityService.getById(this.id).subscribe(data => {
                this.data = data;
                this.activity_form = this.formBuilder.group({
                    activityCd: [this.data.activityCd, Validators.required],
                    name: [this.data.name, Validators.required],
                    type: [this.data.type, Validators.required],
                });
            });
        } else {
            this.result = this.activityService.getLists();
            this.result.subscribe(val => {this.activities = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.activityService.save(this.activity_form.value).subscribe(
            success => {
                this.activityService.getLists().subscribe(val => {this.activities = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = error.error;
                this.onError(j_message.error_message);
            });
    }

    saveUpdateItem(id): void {
        this.activityService.update(id, this.activity_form.value).subscribe(
            success => {
                this.activityService.getLists().subscribe(val => {this.activities = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di simpan");
            },
            error => {
                let j_message = error.error;
                this.onError(j_message.error_message);
            });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.activityService.delete(id).subscribe(
                success => {
                    this.activityService.getLists().subscribe(val => {this.activities = val})
                    this.onSuccess("Data Anda Berhasil Di hapus");
                },
                error => {
                    let j_message = error.error;
                    this.onError(j_message.error_message);
                });
        };
    }
}


