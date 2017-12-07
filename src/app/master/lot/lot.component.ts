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

@Component({
    templateUrl: 'lot.component.html',
    providers: [BlockService, LotService]
})

export class LotComponent extends BaseComponent implements OnInit, IBaseInterface {
    
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
                this.lotService.getLot(this.id).then(data => {
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
            this.result = this.lotService.getLotList();
            this.result.subscribe(val => {this.lots = val; this.dtTrigger.next()});
        }
    }

    getBlockList() {
        this.blockResult = this.blockService.getBlockList();
        this.blockResult.subscribe(val => {this.blocks = val});
    }

    saveAddItem(): void {
        this.lotService.addLot(this.lot_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(id): void {
        this.lotService.updateLot(id, this.lot_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.lotService.deleteLot(id).subscribe(
                error => console.log(error)
            );
        };
    }
}


