import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {MasterRoutingModule} from './master-routing.module';
import {BaseComponent} from './base.component';
import {BaseTrxComponent} from "./base.trx.component";
import {GroupComponent} from './group/group.component';
import {RTComponent} from './rt/rt.component';
import {RWComponent} from './rw/rw.component';
import {KKComponent} from './kk/kk.component';
import {KKDetailsComponent} from './kk/kk_details.component';
import {BlockComponent} from './block/block.component';
import {LotComponent} from './lot/lot.component';
import {KtpComponent} from './ktp/ktp.component';
import {BankComponent} from './bank/bank.component';
import {DocprefixComponent} from './docprefix/docprefix.component';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChargeComponent} from './charge/charge.component';
import {ModalComponent} from './component/modal.component';
import {TrxtypeComponent} from './trxtype/trxtype.component';
import {AddendumChargeComponent} from './addendum_charge/addendum_charge.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {GenerateInvPerLotComponent} from './generateinvperlot/generateinvperlot.component';
import {InvoicePaymentComponent} from './invoice_payment/invoice_payment.component';
import {PaymentInvPerLotComponent} from './paymentinvperlot/paymentinvperlot.component';
import {DebtorEnquiryComponent} from './debtor_enquiry/debtor_enquiry.component';
import {CashbookComponent} from "./cashbook/cashbook.component";
import {PaymentApproveComponent} from "./paymentapprove/paymentapprove.component"
import {TrxtypeSettleComponent} from "./trxtype_settle/trxtype_settle.component"

@NgModule({
    imports: [
        MasterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        DataTablesModule
    ],
    declarations: [
        BaseTrxComponent,
        BaseComponent,
        GroupComponent,
        RTComponent,
        RWComponent,
        KKComponent,
        KKDetailsComponent,
        BlockComponent,
        LotComponent,
        KtpComponent,
        BankComponent,
        DocprefixComponent,
        ChargeComponent,
        ModalComponent,
        TrxtypeComponent,
        AddendumChargeComponent,
        TrxtypeSettleComponent,
        InvoiceComponent,
        GenerateInvPerLotComponent,
        InvoicePaymentComponent,
        PaymentInvPerLotComponent,
        DebtorEnquiryComponent,
        CashbookComponent,
        PaymentApproveComponent
    ]
})
export class MasterModule {}
