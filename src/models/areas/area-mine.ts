import { Area } from "../area";

export class Mine extends Area {
    constructor() {
        super('mine', 'A Mine');

        this.monsterPool.push('drone-swarm');
    }    
}
