import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GroupComponent} from './group/group.component';
import {RTComponent} from './rt/rt.component';
import {RWComponent} from './rw/rw.component';
import {BlockComponent} from './block/block.component';
import {LotComponent} from './lot/lot.component';
import {KtpComponent} from './ktp/ktp.component';
import {KKComponent} from './kk/kk.component';
import {KKDetailsComponent} from './kk/kk_details.component';
import {BankComponent} from './bank/bank.component';
import {DocprefixComponent} from './docprefix/docprefix.component';
import {ChargeComponent} from './charge/charge.component';
import {TrxtypeComponent} from './trxtype/trxtype.component';
import {AddendumChargeComponent} from './addendum_charge/addendum_charge.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {InvoicePaymentComponent} from './invoice_payment/invoice_payment.component';
import {DebtorEnquiryComponent} from './debtor_enquiry/debtor_enquiry.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Master'
        },
        children: [
            {path: 'group', component: GroupComponent, data: {title: 'Group'}},
            {path: 'group/:id', component: GroupComponent, data: {title: 'Group'}},
            {path: 'group/new', component: GroupComponent, data: {title: 'Group'}},

            {path: 'rw', component: RWComponent, data: {title: 'RW'}},
            {path: 'rw/:id', component: RWComponent, data: {title: 'RW'}},
            {path: 'rw/new', component: RWComponent, data: {title: 'RW'}},

            {path: 'block', component: BlockComponent, data: {title: 'Block'}},
            {path: 'block/:id', component: BlockComponent, data: {title: 'Block'}},
            {path: 'block/new', component: BlockComponent, data: {title: 'Block'}},

            {path: 'lot', component: LotComponent, data: {title: 'Lot'}},
            {path: 'lot/:id', component: LotComponent, data: {title: 'Lot'}},
            {path: 'lot/new', component: LotComponent, data: {title: 'Lot'}},

            {path: 'rt', component: RTComponent, data: {title: 'RT'}},
            {path: 'rt/:id', component: RTComponent, data: {title: 'RT'}},
            {path: 'rt/new', component: RTComponent, data: {title: 'RT'}},

            {path: 'ktp', component: KtpComponent, data: {title: 'KTP'}},
            {path: 'ktp/:id', component: KtpComponent, data: {title: 'KTP'}},
            {path: 'ktp/new', component: KtpComponent, data: {title: 'KTP'}},

            {path: 'kk', component: KKComponent, data: {title: 'KK'}},
            {path: 'kk/:id', component: KKComponent, data: {title: 'KK'}},
            {path: 'kk/new', component: KKComponent, data: {title: 'KK'}},

            {path: 'kk_details/:kk', component: KKDetailsComponent, data: {title: 'KK Detail'}},
            {path: 'kk_details/:kk/:id', component: KKDetailsComponent, data: {title: 'KK Detail'}},
            {path: 'kk_details/:kk/new', component: KKDetailsComponent, data: {title: 'KK Detail'}},

            {path: 'bank', component: BankComponent, data: {title: 'Bank'}},
            {path: 'bank/:id', component: BankComponent, data: {title: 'Bank'}},
            {path: 'bank/new', component: BankComponent, data: {title: 'Bank'}},

            {path: 'docprefix', component: DocprefixComponent, data: {title: 'Docprefix'}},
            {path: 'docprefix/:id', component: DocprefixComponent, data: {title: 'Docprefix'}},
            {path: 'docprefix/new', component: DocprefixComponent, data: {title: 'Docprefix'}},

            {path: 'trxtype', component: TrxtypeComponent, data: {title: 'Trx Type'}},
            {path: 'trxtype/:id', component: TrxtypeComponent, data: {title: 'Trx Type'}},
            {path: 'trxtype/new', component: TrxtypeComponent, data: {title: 'Trx Type'}},

            {path: 'charge', component: ChargeComponent, data: {title: 'Charge'}},
            {path: 'charge/:id', component: ChargeComponent, data: {title: 'Charge'}},
            {path: 'charge/new', component: ChargeComponent, data: {title: 'Charge'}},

            {path: 'addendumcharge', component: AddendumChargeComponent, data: {title: 'Addendum Charge'}},
            {path: 'addendumcharge/:id', component: AddendumChargeComponent, data: {title: 'Addendum Charge'}},
            {path: 'addendumcharge/new', component: AddendumChargeComponent, data: {title: 'Addendum Charge'}},

            {path: 'invoice', component: InvoiceComponent, data: {title: 'Generate Invoice'}},
            {path: 'invoice_payment', component: InvoicePaymentComponent, data: {title: 'Payment Invoice'}},

            {path: 'debtor_enquiry', component: DebtorEnquiryComponent, data: {title: 'Debtor Enquiry'}},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule {}
