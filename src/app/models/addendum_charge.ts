export class AddendumCharge {
    constructor(    
        public id: number,
        public calcMethod : string,
        public descs : string,
        public chargeAmt : number,
        public charge : number,
        public lot : number,
        public trxType:number,
        public chargeDescs: string,
        public calcMethodDescs: string,
        public lotNo: string,
        public trxTypeCode:string
    ){}
    
}