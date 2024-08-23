import { Area } from "../area";

export class Mine extends Area {
    constructor() {
        super('mine', 'A Mine');

        this.monsterPool.push('drone_swarm');
        this.monsterPool.push('drone_scout');
        this.monsterPool.push('drone_leader');
    }    
}
