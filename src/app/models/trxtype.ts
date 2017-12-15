export class Trxtype {
    constructor( 
        public id : number,
        public prefix: string,
        public classDescs : string,
        public trxTypeCode : string,
        public trxClass : string,
        public descs : string,
        public active : boolean = false,
        public docPrefix : number,
    ){}
    
}