export class TrxtypeSettle {
    constructor(    
        public id : number,
        public trxCredit : number,
        public trxCreditType: string,
        public trxCreditDescs: string,  
        public trxDebit : number,
        public trxDebitType: string,
        public trxDebitDescs: string,
        public trxDiscount : number,
        public trxDiscountType: string,
        public trxDiscountDescs: string
    ){}
    
}