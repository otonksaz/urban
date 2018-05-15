import {Id} from '../models/id';

export class PaymentApproveForm {
    constructor(
        public userCollect?: number,
        public startDate?: string,
        public endDate?: string,
        public docAmt?: number,
        public descs?: string,
        public isMonthBefore?: boolean,
        public paymentApproveDetails : Id[] = []
    ) {}
  }

  export class PaymentApprove {
    constructor(
        public userCollect?: number,
        public userCollectName?: string,
        public startDate?: Date,
        public endDate?: Date,
        public docAmt?: number,
        public descs?: string,
        public docDate?: Date,
        public terbilang?: string,
        public arLedgers?: number[]
    ) {}
  }