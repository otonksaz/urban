import {Alloc} from '../models/alloc';

export class PaymentUnpost {
    constructor(
        public checked? : boolean,
        public id?: number,
        public lot?: number,
        public descs?: string,
        public docAmt?: number,
        public docDate?: Date,
        public lotNo?: string,
        public aralloctmp_set?: Alloc[]
    ){}
}