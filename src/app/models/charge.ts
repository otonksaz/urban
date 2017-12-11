export class Charge {
    constructor(
        public id : string,
        public rtNo: string,
        public rwNo : string,
        public trxTypeCode : string,
        public calcMethodDescs : string,
        public intervalTypeDescs : string,
        public calcMethod : string,
        public intervalType : string,
        public interval : number,
        public descs : string,
        public chargeAmt : string,
        public rt : number,
        public trxType : string,
    ){}
    
}