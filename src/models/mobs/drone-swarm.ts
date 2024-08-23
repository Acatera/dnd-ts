import { Monster } from "../monster"

export class DroneSwarm extends Monster {
    constructor() {
        super('drone-swarm');

        this.name = 'Drone Swarm';
        this.maxHealth = 15;
        this.health = 15;
        this.expReward = 10;
    }
}
