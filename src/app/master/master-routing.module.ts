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
import {CashbookComponent} from "./cashbook/cashbook.component";
import {BaseTrxComponent} from "./base.trx.component";
import { GenerateInvPerLotComponent } from './generateinvperlot/generateinvperlot.component';
import { PaymentInvPerLotComponent } from './paymentinvperlot/paymentinvperlot.component';
import { PaymentApproveComponent } from './paymentapprove/paymentapprove.component';
import { TrxtypeSettleComponent } from './trxtype_settle/trxtype_settle.component';
import {AuthGuardService as AuthGuard, AuthGuardAdminService as AuthAdmin } from '../services/auth-guard.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Master'
        },
        children: [
            {path: 'user', component: UserComponent, data: {title: 'User'}, canActivate:[AuthAdmin]},
            {path: 'user/:id', component: UserComponent, data: {title: 'User'}, canActivate:[AuthAdmin]},
            {path: 'user/new', component: UserComponent, data: {title: 'User'}, canActivate:[AuthAdmin]},

            {path: 'group', component: GroupComponent, data: {title: 'Group'}, canActivate:[AuthAdmin]},
            {path: 'group/:id', component: GroupComponent, data: {title: 'Group'}, canActivate:[AuthAdmin]},
            {path: 'group/new', component: GroupComponent, data: {title: 'Group'}, canActivate:[AuthAdmin]},

            {path: 'rw', component: RWComponent, data: {title: 'RW'}, canActivate:[AuthAdmin]},
            {path: 'rw/:id', component: RWComponent, data: {title: 'RW'}, canActivate:[AuthAdmin]},
            {path: 'rw/new', component: RWComponent, data: {title: 'RW'}, canActivate:[AuthAdmin]},

            {path: 'block', component: BlockComponent, data: {title: 'Block'}, canActivate:[AuthAdmin]},
            {path: 'block/:id', component: BlockComponent, data: {title: 'Block'}, canActivate:[AuthAdmin]},
            {path: 'block/new', component: BlockComponent, data: {title: 'Block'}, canActivate:[AuthAdmin]},

            {path: 'lot', component: LotComponent, data: {title: 'Lot'}, canActivate:[AuthAdmin]},
            {path: 'lot/:id', component: LotComponent, data: {title: 'Lot'}, canActivate:[AuthAdmin]},
            {path: 'lot/new', component: LotComponent, data: {title: 'Lot'}, canActivate:[AuthAdmin]},

            {path: 'rt', component: RTComponent, data: {title: 'RT'}, canActivate:[AuthAdmin]},
            {path: 'rt/:id', component: RTComponent, data: {title: 'RT'}, canActivate:[AuthAdmin]},
            {path: 'rt/new', component: RTComponent, data: {title: 'RT'}, canActivate:[AuthAdmin]},

            {path: 'ktp', component: KtpComponent, data: {title: 'KTP'}, canActivate:[AuthAdmin]},
            {path: 'ktp/:id', component: KtpComponent, data: {title: 'KTP'}, canActivate:[AuthAdmin]},
            {path: 'ktp/new', component: KtpComponent, data: {title: 'KTP'}, canActivate:[AuthAdmin]},

            {path: 'kk', component: KKComponent, data: {title: 'KK'}, canActivate:[AuthAdmin]},
            {path: 'kk/:id', component: KKComponent, data: {title: 'KK'}, canActivate:[AuthAdmin]},
            {path: 'kk/new', component: KKComponent, data: {title: 'KK'}, canActivate:[AuthAdmin]},

            {path: 'kk_details/:kk', component: KKDetailsComponent, data: {title: 'KK Detail'}, canActivate:[AuthAdmin]},
            {path: 'kk_details/:kk/:id', component: KKDetailsComponent, data: {title: 'KK Detail'}, canActivate:[AuthAdmin]},
            {path: 'kk_details/:kk/new', component: KKDetailsComponent, data: {title: 'KK Detail'}, canActivate:[AuthAdmin]},

            {path: 'bank', component: BankComponent, data: {title: 'Bank'}, canActivate:[AuthAdmin]},
            {path: 'bank/:id', component: BankComponent, data: {title: 'Bank'}, canActivate:[AuthAdmin]},
            {path: 'bank/new', component: BankComponent, data: {title: 'Bank'}, canActivate:[AuthAdmin]},

            {path: 'docprefix', component: DocprefixComponent, data: {title: 'Docprefix'}, canActivate:[AuthAdmin]},
            {path: 'docprefix/:id', component: DocprefixComponent, data: {title: 'Docprefix'}, canActivate:[AuthAdmin]},
            {path: 'docprefix/new', component: DocprefixComponent, data: {title: 'Docprefix'}, canActivate:[AuthAdmin]},

            {path: 'trxtype', component: TrxtypeComponent, data: {title: 'Trx Type'}, canActivate:[AuthAdmin]},
            {path: 'trxtype/:id', component: TrxtypeComponent, data: {title: 'Trx Type'}, canActivate:[AuthAdmin]},
            {path: 'trxtype/new', component: TrxtypeComponent, data: {title: 'Trx Type'}, canActivate:[AuthAdmin]},

            {path: 'charge', component: ChargeComponent, data: {title: 'Charge'}, canActivate:[AuthAdmin]},
            {path: 'charge/:id', component: ChargeComponent, data: {title: 'Charge'}, canActivate:[AuthAdmin]},
            {path: 'charge/new', component: ChargeComponent, data: {title: 'Charge'}, canActivate:[AuthAdmin]},

            {path: 'addendumcharge', component: AddendumChargeComponent, data: {title: 'Addendum Charge'}, canActivate:[AuthAdmin]},
            {path: 'addendumcharge/:id', component: AddendumChargeComponent, data: {title: 'Addendum Charge'}, canActivate:[AuthAdmin]},
            {path: 'addendumcharge/new', component: AddendumChargeComponent, data: {title: 'Addendum Charge'}, canActivate:[AuthAdmin]},

            {path: 'trxtypesettle', component: TrxtypeSettleComponent, data: {title: 'Trx Type Settle'}, canActivate:[AuthAdmin]},
            {path: 'trxtypesettle/:id', component: TrxtypeSettleComponent, data: {title: 'Trx Type Settle'}, canActivate:[AuthAdmin]},
            {path: 'trxtypesettle/new', component: TrxtypeSettleComponent, data: {title: 'Trx Type Settle'}, canActivate:[AuthAdmin]},

            {path: 'invoice', component: InvoiceComponent, data: {title: 'Generate Invoice'}, canActivate:[AuthAdmin]},
            {path: 'generateinvperlot', component: GenerateInvPerLotComponent, data: {title: 'Generate Invoice By Lot'}, canActivate:[AuthAdmin]},
            {path: 'invoice_payment', component: InvoicePaymentComponent, data: {title: 'Payment Invoice'}, canActivate:[AuthAdmin]},
            {path: 'paymentinvperlot', component: PaymentInvPerLotComponent, data: {title: 'Payment Invoice By Lot'}},
            {path: 'paymentapprove', component: PaymentApproveComponent, data: {title: 'Payment Approve'}, canActivate:[AuthAdmin]},

            {path: 'debtor_enquiry', component: DebtorEnquiryComponent, data: {title: 'Debtor Enquiry'}, canActivate:[AuthAdmin]},

            {path: 'cashbook', component: CashbookComponent, data: {title: 'Cash Book'}, canActivate:[AuthAdmin]},
            {path: 'cashbook/:id', component: CashbookComponent, data: {title: 'Cash Book'}, canActivate:[AuthAdmin]},
            {path: 'cashbook/new', component: CashbookComponent, data: {title: 'Cash Book'}, canActivate:[AuthAdmin]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterRoutingModule {}
