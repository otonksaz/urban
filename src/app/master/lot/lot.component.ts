import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Block} from '../../models/block';
import {Lot} from '../../models/lot';
import {BlockService} from '../../services/block.service';
import {LotService} from '../../services/lot.service';
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'lot.component.html',
    providers: [BlockService, LotService]
})

export class LotComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

    lot_form: FormGroup;
    result: Observable<Lot[]>;
    blockResult: Observable<Block[]>;
    blocks: Block[] = [];
    lots: Lot[] = [];
    data: Lot;

    constructor(
        private blockService : BlockService,
        private lotService: LotService,
        private routerLot: Router,
        private routeLot: ActivatedRoute,
        private toastrLot : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerLot, routeLot, toastrLot)
        this.router = routerLot
        this.route = routeLot
        this.toastr = toastrLot
        this.IService = this;
        this.lot_form = formBuilder.group({
            lotNo : ["", Validators.required],
            descs : ["", Validators.required],
            landArea : ["", Validators.required],
            buildArea : ["", Validators.required],
            block: ["", Validators.required]
        });

        this.url = "master/lot";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.lotService.getById(this.id).subscribe(data => {
                    this.data = data;
                    this.lot_form = this.formBuilder.group({
                        lotNo : [this.data.lotNo, Validators.required],
                        descs : [this.data.descs, Validators.required],
                        landArea : [this.data.landArea, Validators.required],
                        buildArea : [this.data.buildArea, Validators.required],
                        block: [this.data.block, Validators.required]
                    });
                });
            }
            this.getBlockList();
        } else {
            this.result = this.lotService.getLists();
            this.result.subscribe(val => {this.lots = val; this.dtTrigger.next()});
        }
    }

    getBlockList() {
        this.blockResult = this.blockService.getLists();
        this.blockResult.subscribe(val => {this.blocks = val});
    }

    saveAddItem(): void {
        this.lotService.save(this.lot_form.value).subscribe(
          success => {
              this.lotService.getLists().subscribe(val => {this.lots = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(id): void {
        this.lotService.update(id, this.lot_form.value).subscribe(
          success => {
            this.lotService.getLists().subscribe(val => {this.lots = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.lotService.delete(id).subscribe(
              success => {
                this.lotService.getLists().subscribe(val => {this.lots = val})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = error.error;
                this.onError(j_message.error_message);
              });
        };
    }
}


