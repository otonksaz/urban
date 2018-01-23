export class Alloc {
    constructor( 
        public id : number,
        public lotNo: string,
        public debitDocNo: string,
        public debitDescs: string,
        public debitTrxDate: string,
        public debitDocDate: string,
        public debitRefNo: string,
        public debitDocAmt: string,
        public debitTrxTypeCode: string,
        public creditDocNo: string,
        public creditDescs: string,
        public creditTrxDate: string,
        public creditDocDate: string,
        public creditRefNo: string,
        public creditDocAmt: string,
        public creditTrxTypeCode: string,
        public allocDate: string,
        public allocAmt: string,
        public debitDoc: number,
        public creditDoc: number,
    ){}
    
}