import { Component, OnInit } from '@angular/core';
import { Dashboard, PayUnpostDtl } from './../models/dashboard';
import { DashboardService } from './../services/dashboard.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  data: Dashboard;
  agingPercentage: number = 0;
  agingLotCount: number = 0;
  agingSum: number = 0;
  totalPayUnpost: number = 0;
  payUnposts: PayUnpostDtl[] = [];

  constructor(
    private routerDash: Router,
    private routeDash: ActivatedRoute,
    private toastrDash: ToastrService,
    private dashService: DashboardService
  ) { }

  ngOnInit() {
    this.dashService.getData().subscribe(data => {
      this.data = data;
      this.agingPercentage = this.data.agingPercentage;
      this.agingLotCount = this.data.agingLotCount;
      this.agingSum = this.data.agingSum;
      this.totalPayUnpost = this.data.totalPayUnpost;
      this.payUnposts = this.data.payUnpostDtl;      
    });
  }

}
