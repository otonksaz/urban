import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {KKService} from '../../services/kk.service';
import {LotService} from '../../services/lot.service';
import {ModalService} from '../../services/modal.service';
import {Observable} from 'rxjs/Observable';
import {KK} from '../../models/kk';
import {Lot} from '../../models/lot';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {KtpService} from '../../services/ktp.service';
import {Ktp} from '../../models/ktp';
import {KKDetails} from '../../models/kk_details';


@Component({
    templateUrl: 'kk.component.html',
    providers: [KKService, LotService, ModalService, KtpService]
})

export class KKComponent extends BaseComponent implements OnInit, IBaseInterface {

    kk_form: FormGroup;
    result: Observable<KK[]>;
    lotResult: Observable<Lot[]>;
    kk_details: KKDetails[] = [];
    kk_item: KKDetails;
    kk_item_modal: KKDetails;
    kks: KK[] = [];
    kk: KK;
    lots: Lot[] = [];
    ktpResult: Observable<Ktp[]>;
    ktps: Ktp[] = [];
    closeResult: string;
    modalReference: NgbModalRef;


    data: KK;

    constructor(
        private kkService: KKService,
        private lotService: LotService,
        private routerKK: Router,
        private routeKK: ActivatedRoute,
        private toastrKK: ToastrService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private ktpService: KtpService,
    ) {
        super(routerKK, routeKK, toastrKK)
        this.router = routerKK
        this.route = routeKK
        this.toastr = toastrKK
        this.IService = this
        //        this.kk_form = formBuilder.group({
        //            kkNo: ["", Validators.required],
        //            address: ["", Validators.required],
        //            lot: ["", Validators.required]
        //        });

        this.kk_form = formBuilder.group({
            kkNo: [""],
            address: [""],
            lot: [""]
        });


        this.url = "master/kk";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.kkService.getKKByNo(this.id).then(data => {
                    this.data = data;
                    this.kk_details = data.kkDetails;
                    //                    this.kk_form = this.formBuilder.group({
                    //                        kkNo: [this.data.kkNo, Validators.required],
                    //                        address: [this.data.address, Validators.required],
                    //                        lot: [this.data.lot, Validators.required]
                    //                    });
                    this.kk_form = this.formBuilder.group({
                        kkNo: [this.data.kkNo, Validators.required],
                        address: [this.data.address, Validators.required],
                        lot: [this.data.lot, Validators.required]
                    });

                });
            }
            this.getLotList();
            this.getKtpList();
        } else {
            this.result = this.kkService.getKKList();
            this.result.subscribe(val => {this.kks = val; this.dtTrigger.next()});
        }
    }

    getLotList() {
        this.lotResult = this.lotService.getLotList();
        this.lotResult.subscribe(val => {this.lots = val});
    }

    getKtpList() {
        this.ktpResult = this.ktpService.getKtpList();
        this.ktpResult.subscribe(val => {this.ktps = val});
    }

    saveAddItem(): void {
        var kk = new KK();
        kk.lot = this.kk_form.controls['lot'].value;
        kk.kkNo = this.kk_form.controls['kkNo'].value;
        kk.address = this.kk_form.controls['address'].value;
        kk.kkDetails = this.kk_details;
        this.kkService.addKK(kk).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(url): void {
        var kk = new KK();
        kk.lot = this.kk_form.controls['lot'].value;
        kk.kkNo = this.kk_form.controls['kkNo'].value;
        kk.address = this.kk_form.controls['address'].value;
        kk.kkDetails = this.kk_details;
        this.kkService.updateKK(url, kk).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(url): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.kkService.deleteKK(url).subscribe(
                error => console.log(error)
            );
            //            this.result = this.rwService.getRWList();
            //            this.result.subscribe(val => {this.rws = val; this.dtTrigger.next()});
        };
    }

    modalOpen(id: string) {
        this.kk_item_modal = new KKDetails();
        this.modalReference = this.modalService.open(id);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    save_detail() {
        if (this.kk_item_modal.id === undefined) {
            this.kk_item_modal.id = Math.floor(1000 + Math.random() * 9000);
            this.kk_details.push(this.kk_item_modal);
        } else {
            var index = this.kk_details.indexOf(this.kk_details.find(x => x.id === this.kk_item_modal.id));
            this.kk_details[index] = this.kk_item_modal;
        }
        this.modalReference.close();
    }

    updateKTP(text: string) {
        this.kk_item_modal.nik = text;
    }

    updateEducation(text: string) {
        this.kk_item_modal.educationDescs = text;
    }

    updateFamilyRelation(text: string) {
        this.kk_item_modal.familyRelationDescs = text;
    }

    edit_detail(id: string, kkId: number) {
        this.kk_item_modal = new KKDetails();
        this.kk_item_modal = this.kk_details.find(x => x.id === kkId);
        this.modalService.open(id).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    delete_detail(kkId: number) {
        var index = this.kk_details.indexOf(this.kk_details.find(x => x.id === kkId));
        this.kk_details.splice(index, 1);
    }

}