import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Docprefix} from '../../models/docprefix';
import {DocprefixService} from '../../services/docprefix.service';

@Component({
    templateUrl: 'docprefix.component.html',
    providers: [DocprefixService]
})

export class DocprefixComponent extends BaseComponent implements OnInit, IBaseInterface {
    
    docprefix_form: FormGroup;
    result: Observable<Docprefix[]>;
    docprefixs: Docprefix[] = [];
    data: Docprefix;

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
        if (this.method == this.ACTION_UPDATE) {
            this.docprefixService.getDocprefix(this.id).then(data => {
                this.data = data;
                this.docprefix_form = this.formBuilder.group({
                    prefix: [this.data.prefix, Validators.required],
                    descs: [this.data.descs, Validators.required],
                    docFormat: [this.data.docFormat, Validators.required],
                    docReset: [this.data.docReset, Validators.required]
                });
            });
        } else {
            this.result = this.docprefixService.getDocprefixs();
            this.result.subscribe(val => {this.docprefixs = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.docprefixService.addDocprefix(this.docprefix_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(id): void {
        this.docprefixService.updateDocprefix(id, this.docprefix_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.docprefixService.deleteGroup(id).subscribe(
                error => console.log(error)
            );
        };
    }
}


