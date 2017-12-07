import {BaseComponent} from '../base.component';
import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group.service';

@Component({
    templateUrl: 'group.component.html',
    providers: [GroupService]
})

export class GroupComponent extends BaseComponent implements OnInit, IBaseInterface {
    
    group_form: FormGroup;
    result: Observable<Group[]>;
    groups: Group[] = [];
    data: Group;

    constructor(
        private groupService : GroupService,
        private routerGroup: Router,
        private routeGroup: ActivatedRoute,
        private toastrGroup : ToastrService,
        private formBuilder: FormBuilder
    ) {
        super(routerGroup, routeGroup, toastrGroup)
        this.router = routerGroup
        this.route = routeGroup
        this.toastr = toastrGroup
        this.IService = this;
        this.group_form = formBuilder.group({
            name: ["", Validators.required]
        });
        
        this.url = "master/group";
    }

    ngOnInit(): void {
        
        this.init();
        if (this.method == this.ACTION_UPDATE) {
            this.groupService.getGroup(this.id).then(data => {
                this.data = data;
                this.group_form = this.formBuilder.group({
                    name: [this.data.name, Validators.required],
                });
            });
        } else {
            this.result = this.groupService.getGroupsList();
            this.result.subscribe(val => {this.groups = val; this.dtTrigger.next()});
        }
    }

    saveAddItem(): void {
        this.groupService.addGroup(this.group_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveUpdateItem(id): void {
        this.groupService.updateGroup(id, this.group_form.value).subscribe(
            error => console.log(error)
        );
    }

    saveDeleteItem(id): void {
        if (confirm("Apakah Anda yakin akan menghapus data")) {
            this.groupService.deleteGroup(id).subscribe(
                error => console.log(error)
            );
        };
    }
}


