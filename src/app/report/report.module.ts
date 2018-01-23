import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ReportRoutingModule} from './report-routing.module';
import {ReportInvoiceComponent} from './reportInvoice/reportInvoice.component';



@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReportRoutingModule,
        DataTablesModule 
    ],
    declarations: [
        ReportInvoiceComponent
    ]
})
export class ReportModule {}
