export class Invoice {
    constructor( 
        public checked? : boolean,
        public id?: number,
        public trxTypeCode?: string,
        public lotNo?: string,
        public unallocated?: number,
        public aging?: number,
        public agingIncUnpost?: number,
        public docNo?: string,
        public trxDate?: string,
        public docDate?: string,
        public descs?: string,
        public docAmt?: number,
        public refNo?: string,
        public lot?: number,
        public trxType?:number,
        public paymentAmt? : number,
        public discountAmt? : number
    ){}
    
}