export class PaymentInvByLot {
    constructor(
        public lot?: number,
        public trxTypeInv?: number,
        public docAmt?: number,
        public discountAmt?: number,
        public paymentDetails: PaymentInvByLotDetail[] = []
    ) {}
}

export class PaymentInvByLotDetail {
    constructor(
        public inv?: number,
        public docAmt?: number,
        public discountAmt?: number
    ) {}
}