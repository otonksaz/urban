import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {ReportInvoiceComponent} from './reportInvoice/reportInvoice.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Report'
        },
        children: [
            {path: 'invoice', component: ReportInvoiceComponent, data: {title: 'Report Invoice'}},
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
