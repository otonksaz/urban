import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {ReportInvoiceComponent} from './reportInvoice/reportInvoice.component';
import { ReportbulananComponent } from './reportbulanan/reportbulanan.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Report'
        },
        children: [
            {path: 'invoice', component: ReportInvoiceComponent, data: {title: 'Report Invoice'}},
            {path: 'monthly', component: ReportbulananComponent, data: {title: 'Report Bulanan'}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ReportRoutingModule {}
