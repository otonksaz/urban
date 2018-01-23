export class ReportInvoice {
    constructor(    
        public lotNo : string,
        public docDate : string,
        public descs: string,
        public docAmt : number,
        public aging : number,
        public maxDateOfMate: string
    ){}
    
}