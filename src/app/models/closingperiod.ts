export class ClosingPeriod {
    constructor( 
        public id : number,
        public periodYear: number,
        public periodMonth : number,
        public periodStart : Date,
        public periodEnd : Date,
        public closingDate : Date
    ){}
    
}