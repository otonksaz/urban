import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Block} from '../../models/block';
import {RT} from '../../models/rt';
import {BlockService} from '../../services/block.service';
import {RTService} from '../../services/rt.service';

@Component({
    templateUrl: 'block.component.html',
    providers: [BlockService, RTService]
})

export class BlockComponent extends BaseComponent implements OnInit, IBaseInterface {
    
    block_form: FormGroup;
    result: Observable<Block[]>;
    rtResult: Observable<RT[]>;
    rts: RT[] = [];
    blocks: Block[] = [];
    data: Block;

    constructor(
        private blockService : BlockService,
        private rtService: RTService,
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
        this.block_form = formBuilder.group({
            blockNo: ["", Validators.required],
            descs: ["", Validators.required],
            rt: ["", Validators.required]
        });
        
        this.url = "master/block";
    }

    ngOnInit(): void {
        this.init();
        if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
            if (this.method == this.ACTION_UPDATE) {
                this.blockService.getBlock(this.id).then(data => {
                    this.data = data;
                    this.block_form = this.formBuilder.group({
                        blockNo: [this.data.blockNo, Validators.required],
                        descs: [this.data.descs, Validators.required],
                        rt: [this.data.rt, Validators.required]
                    });
                });
            }
            this.getRTList();
        } else {
            this.result = this.blockService.getBlockList();
            this.result.subscribe(val => {this.blocks = val; this.dtTrigger.next()});
        }
    }

    getRTList() {
        this.rtResult = this.rtService.getRTList();
        this.rtResult.subscribe(val => {this.rts = val});
    }

    saveAddItem(): void {
        this.blockService.addBlock(this.block_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(id): void {
        this.blockService.updateBlock(id, this.block_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.blockService.deleteBlock(id).subscribe(
                error => console.log(error)
            );
        };
    }
}


