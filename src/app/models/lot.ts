// import {RT} from './rt';
// import {Block} from './block'
import {KK} from '../models/kk';
export class Lot {
    constructor(    
        public id: number,
        public lotNo : string,
        public descs : string,
        public landArea : number,
        public buildArea : number,
        public rtNo : string,
        public rwNo : string,
        public blockNo : string,
        public block : number,
        public kks? : KK[]
    ){}
    
}