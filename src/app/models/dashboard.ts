export class Dashboard {
    constructor(
        public agingPercentage?:number,
        public agingLotCount?:number,
        public agingSum?:number,
        public totalPay?:number,
        public totalPayUnpost?: number,
        public totalPayAll?: number,
        public payUnpostDtl?:PayUnpostDtl[]
    ){}
}

export class PayUnpostDtl {
    constructor(
        public rtNo?:string,
        public lotCount?:number,
        public undeposited?:number,
        public trxTypeCode?:string,
        public trxTypeDescs?:string
    ){}
}
