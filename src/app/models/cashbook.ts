import {Validators} from "@angular/forms";

export class Cashbook {
  constructor(
    public docNo: string,
    public trxDate: string,
    public docDate: string,
    public trxMode: string,
    public descs: string,
    public refNo: number,
    public docAmt: number,
    public trxModeDescs: string
  ){}

}
