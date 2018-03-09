import {Group} from '../models/group';
import {Block} from '../models/block';
import {Id} from './id'

export class MsUser {
    constructor(
        public username?: string,
        public email?: string,
        public first_name?: string,
        public last_name?: string,
        public password?: string,
        public fullName?: string,
        public groupName?: string,
        public groups? : string[],
        public userGroups? : Group[],
        public userBlocks? : Block[]
    ) {}
}



export class AssignUserBlock {
    constructor(
        public userId: string,
        public blockIds: Id[]
    ) {}
}