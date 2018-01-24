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
import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
    templateUrl: 'block.component.html',
    providers: [BlockService, RTService]
})

export class BlockComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {

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
                this.blockService.getById(this.id).subscribe(data => {
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
            this.result = this.blockService.getLists();
            this.result.subscribe(val => {this.blocks = val; this.dtTrigger.next()});
        }
    }

    getRTList() {
        this.rtResult = this.rtService.getLists();
        this.rtResult.subscribe(val => {this.rts = val});
    }

    saveAddItem(): void {
        this.blockService.save(this.block_form.value).subscribe(
          success => {
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveUpdateItem(id): void {
        this.blockService.update(id, this.block_form.value).subscribe(
          success => {
            this.blockService.getLists().subscribe(val => {this.blocks = val; this.dtTrigger.next()})
            this.onSuccess("Data Anda Berhasil Di simpan");
          },
          error=> {
            let j_message = JSON.parse(error._body);
            this.onError(j_message.error_message);
          });
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.blockService.delete(id).subscribe(
              success => {
                this.blockService.getLists().subscribe(val => {this.blocks = val; this.dtTrigger.next()})
                this.onSuccess("Data Anda Berhasil Di hapus");
              },
              error=> {
                let j_message = JSON.parse(error._body);
                this.onError(j_message.error_message);
              });
        };
    }
}


