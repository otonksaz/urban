import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Trxtype} from '../../models/trxtype';
import {Docprefix} from '../../models/docprefix';
import {Option} from '../../models/option';
import {TrxtypeService} from '../../services/trxtype.service';
import {DocprefixService} from '../../services/docprefix.service';
import {TrxClassOptions} from '../../constant/option'

@Component({
    templateUrl: 'trxtype.component.html',
    providers: [TrxtypeService, DocprefixService]
})

export class TrxtypeComponent extends BaseComponent implements OnInit, IBaseInterface {
    
    trxtype_form: FormGroup;
    result: Observable<Trxtype[]>;
    docPrefixResult: Observable<Docprefix[]>;
    trxtypes: Trxtype[] = [];
    docprefixes: Docprefix[] = [];
    trxClassesOptions: Option[]=[];
    data: Trxtype;

    constructor(
        private trxTypeService : TrxtypeService,
        private docprefixService: DocprefixService,
        private routerBlock: Router,
        private routeBlock: ActivatedRoute,
        private toastrBlock : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerBlock, routeBlock, toastrBlock)
        this.router = routerBlock
        this.route = routeBlock
        this.toastr = toastrBlock
        this.IService = this;
        this.trxtype_form = formBuilder.group({
            trxTypeCode: ["", Validators.required],
            trxClass: ["", Validators.required],
            descs: ["", Validators.required],
            active: [false, Validators.required],
            docPrefix: ["", Validators.required],
        });
        
        this.url = "master/trxtype";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.trxTypeService.getTrxtype(this.id).then(data => {
                    this.data = data;
                    this.trxtype_form = this.formBuilder.group({
                        trxTypeCode: [this.data.trxTypeCode, Validators.required],
                        trxClass: [this.data.trxClass, Validators.required],
                        descs: [this.data.descs, Validators.required],
                        active: [this.data.active, Validators.required],
                        docPrefix: [this.data.docPrefix, Validators.required]
                    });
                });
            }
            this.getDocprefixes();
            this.trxClassesOptions = TrxClassOptions
        } else {
            this.result = this.trxTypeService.getTrxtypes();
            this.result.subscribe(val => {this.trxtypes = val; this.dtTrigger.next()});
        }
    }

    getDocprefixes() {
        this.docPrefixResult = this.docprefixService.getDocprefixs();
        this.docPrefixResult.subscribe(val => {this.docprefixes = val});
    }

    saveAddItem(): void {
        this.trxTypeService.addTrxtype(this.trxtype_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(id): void {
        this.trxTypeService.updateTrxtype(id, this.trxtype_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.trxTypeService.deleteTrxtype(id).subscribe(
                error => console.log(error)
            );
        };
    }
}


