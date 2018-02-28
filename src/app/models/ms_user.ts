import {Group} from '../models/group';

export class MsUser {
    constructor(
        public username?: string,
        public email?: string,
        public fullName?: string,
        public groups? : Group[]
    ) {}
  }