export class InvoicePayment {
    constructor(
        public docDate?: string,
        public docAmt?: number,
        public refNo?: string,
        public trxType?: string,
        public paymentDetails: InvoicePaymentDetail[] = []
    ) {}

}

export class InvoicePaymentDetail {
    constructor(
        public arLedgerInv?: number,
        public allocAmt?: number
    ) {}

}