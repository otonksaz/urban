import { Component, OnInit } from '@angular/core';
import {Month, Year} from "../../models/date";
import {DateService} from "../../services/date.service";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-reportbulanan',
  templateUrl: './reportbulanan.component.html',
  styleUrls: ['./reportbulanan.component.scss'],
  providers: [DateService, ReportService]
})
export class ReportbulananComponent implements OnInit {
  months: Month[] = [];
  years: Year[] = [];
  month_selected: number;
  year_selected: number;

  constructor(
    private dateService: DateService,
    private reportService: ReportService
  ) { 
    let today = new Date();

    this.months = this.dateService.getMonths();
    this.years = this.dateService.getYears();
    
    this.month_selected = today.getMonth() + 1;
    this.year_selected = today.getFullYear();
  }

  ngOnInit() {
  }

  getReport(): void {
    this.reportService.getMonthlyReport(this.month_selected.toString(), this.year_selected.toString())
          .subscribe((res) => {
              var fileURL = URL.createObjectURL(res);
              window.open(fileURL);    
          },
          error => {
              console.log(error);
          });
  }
}
