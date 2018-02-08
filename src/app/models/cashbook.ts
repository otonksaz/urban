import {Validators} from "@angular/forms";

export class Cashbook {
  constructor(
    public docNo: number,
    public trxDate: string,
    public docDate: string,
    public trxMode: string,
    public descs: string,
    public refNo: number,
    public docAmt: number
    // public id : number,
    // public bankCd: string,
    // public descs : string,
    // public bankAccount : string,
  ){}

}
