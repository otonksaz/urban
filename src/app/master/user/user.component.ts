import {IBaseInterface} from '../base.interface';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {AssignUserBlock, MsUser} from '../../models/ms_user';
import {Id} from '../../models/id'
import {UserService} from '../../services/user.service';
import {Block} from '../../models/block';
import {BlockService} from '../../services/block.service';
import {Group} from '../../models/group';
import {GroupService} from '../../services/group.service';

import {BaseTrxComponent} from "../base.trx.component";
import {IBaseTrxInterface} from "../base.trx.interface";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    UserService, 
    BlockService,
    GroupService
  ]
})
export class UserComponent extends BaseTrxComponent implements OnInit, IBaseTrxInterface {
  form: FormGroup;
  blockResult:Observable<Block[]>;
  blocks: Block[] = [];
  userResult:Observable<MsUser[]>;
  users: MsUser[] = [];
  groupResult:Observable<Group[]>;
  groups: Group[] = [];
  data: MsUser;
  currentBlocks: Block[] = [];
  currentUsername: string = "";
  checkAll: boolean;

  constructor(
    private routerUser: Router,
    private routeUser: ActivatedRoute,
    private toastrUser: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private blockService: BlockService,
    private groupService: GroupService
  ) { 
    super(routerUser, routeUser, toastrUser);
    this.router = routerUser;
    this.route = routeUser;
    this.toastr = toastrUser;
    this.IService = this;
    this.form = formBuilder.group({
        username : ["", Validators.required],
        email : ["", Validators.required],
        password : ["", Validators.required],
        first_name : ["", Validators.required],
        last_name: ["", Validators.required],
        group:["", Validators.required],
    });

    this.url = "master/user";
  }

  ngOnInit() {
    this.init();
    if (this.method == this.ACTION_UPDATE || this.method == this.ACTION_ADD) {
        if (this.method == this.ACTION_UPDATE) {
            this.userService.getById(this.id).subscribe(data => {
                this.data = data;
                this.selectUser(this.data);
                let groupnya = "";
                for (let group of this.data.userGroups) {
                  groupnya = group.id;
                }
                this.form = this.formBuilder.group({
                  username : [this.data.username, Validators.required],
                  email : [this.data.email, Validators.required],
                  password : ["-", Validators.required],
                  first_name : [this.data.first_name, Validators.required],
                  last_name: [this.data.last_name, Validators.required],
                  group:[groupnya, Validators.required],
                });
                this.getBlocksForUpdate();
            });
        } else {
          this.getBlocks();
        }
        this.getGroups();
    } else {
      this.userResult = this.userService.getLists();
      this.userResult.subscribe(val => {
        this.users = val;
        let groupName = "";
        for (let usernya of this.users) {
          for (let group of usernya.userGroups) {
            groupName = group.name;
          }
          usernya.groupName = groupName;
        }      
        this.dtTrigger.next();
      });
    }
  }

  getUsers() {
    this.userResult = this.userService.getLists();
    this.userResult.subscribe(val => {this.users = val; this.dtTrigger.next();});
  }

  getBlocks() {
    this.blockResult = this.blockService.getLists();
    this.blockResult.subscribe(val => {
      this.blocks = val; 
      this.dtTrigger_reserved.next();
    });
  }

  getBlocksForUpdate() {
    this.blockResult = this.blockService.getLists();
    this.blockResult.subscribe(val => {
      this.blocks = val;       
      for (let b of this.blocks) {
        for (let bc of this.currentBlocks) {
          if (b.id == bc.id) {
            console.log("match");
            b.checked = true;
          }
        }
      }
      this.dtTrigger_reserved.next();
    });
  }

  getGroups() {
    this.groupResult = this.groupService.getLists();
    this.groupResult.subscribe(val => {this.groups = val; this.dtTrigger_reserved2.next();});
  }

  saveAddItem(): void {
    let oUser = new MsUser();
    oUser.username = this.form.controls['username'].value;
    oUser.email = this.form.controls['email'].value;
    oUser.first_name = this.form.controls['first_name'].value;
    oUser.last_name = this.form.controls['last_name'].value;
    oUser.password = this.form.controls['password'].value;

    let groupId = this.form.controls['group'].value;
    oUser.groups = [];
    oUser.groups.push(groupId);

    //this.userService.save(this.form.value).subscribe(
    this.userService.save(oUser).subscribe(
      success => {
          this.userService.getLists().subscribe(val => {this.users = val; this.dtTrigger.next()})
        this.onSuccess("Data Anda Berhasil Di simpan");
        this.assignUserBlocks(success.id);
      },
      error=> {
            let j_message = error.error;
            this.onError(j_message.error_message);
      });
  }

  saveUpdateItem(id): void {
    let oUser = new MsUser();
    oUser.username = this.form.controls['username'].value;
    oUser.email = this.form.controls['email'].value;
    oUser.first_name = this.form.controls['first_name'].value;
    oUser.last_name = this.form.controls['last_name'].value;
    oUser.password = this.form.controls['password'].value;

    let groupId = this.form.controls['group'].value;
    oUser.groups = [];
    oUser.groups.push(groupId);

    //this.userService.update(id, this.form.value).subscribe(
    this.userService.update(id, oUser).subscribe(
      success => {
        this.userService.getLists().subscribe(val => {this.users = val; this.dtTrigger.next()})
        this.onSuccess("Data Anda Berhasil Di simpan");
        this.assignUserBlocks(success.id);
      },
      error=> {
            let j_message = error.error;
            this.onError(j_message.error_message);
      });
  }

  saveDeleteItem(id): void {
    if (confirm("Apakah Anda yakin akan menghapus data")) {
        this.userService.delete(id).subscribe(
          success => {
            this.userService.getLists().subscribe(val => {this.users = val})
            this.onSuccess("Data Anda Berhasil Di hapus");
          },
          error=> {
            let j_message = error.error;
            this.onError(j_message.error_message);
          });
    };
  }

  resetPassword(id): void {
    if (confirm("Apakah Anda yakin akan mengatur ulang password untuk user tersebut?")) {
        let oId: Id = { id : id };
        this.userService.resetPassword(id, oId).subscribe(
          success => {
            //this.userService.getLists().subscribe(val => {this.users = val})
            this.onSuccess("Password berhasi diatur ulang");
          },
          error=> {
            let j_message = error.error;
            this.onError(j_message.error_message);
          });
    };
  }

  assignUserBlocks(userId) {
    let ids:Id[] = [];
    for (let b of this.blocks) {
      if (b.checked) {
        let id: Id = {id:b.id};
        ids.push(id);
      }
    } 
    let assignUserBlock = new AssignUserBlock(userId, ids);
    this.userService.assignUserBlocks(assignUserBlock).subscribe(
      success => {          
        this.onSuccess("Blok-blok terpilih telah terpasang di user");
      },
      error=> {
            let j_message = error.error;
            this.onError(j_message.error_message);
      });
  }

  selectUser(user) {
    this.currentUsername = user.username;
    this.currentBlocks = [];
    for (let ub of user.userBlocks) {
      this.currentBlocks.push(ub);
    }
  }

  doCheckAllBlocks() {
    for (let block of this.blocks) {
        block.checked = this.checkAll;
    }
  }
}
