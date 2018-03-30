import {Validators} from "@angular/forms";

export class Cashbook {
  constructor(
    public docNo: string,
    public trxDate: string,
    public docDate: string,
    public trxMode: string,
    public activity: string,
    public descs: string,
    public refNo: number,
    public docAmt: number,
    public trxModeDescs: string,
    public debitAmt: number,
    public creditAmt: number
  ){}

}
