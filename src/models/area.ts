import { Monster } from "./monster";
import { DroneSwarm } from "./mobs/drone-swarm";

export class Area {
    id: string;
    name: string;
    monsterPool: string[] = [];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    spawnEncounter(): Monster | null {
        if (this.monsterPool.length < 0) {
            return null;
        }

        const randIndex = Math.floor(Math.random() * this.monsterPool.length);
        const randMonsterId = this.monsterPool[randIndex];

        if (randMonsterId == 'drone-swarm') {
            return new DroneSwarm();
        }

        return new Monster(randMonsterId);
    }
}
// connections: this connects to a mine, a forest, and a mountain
// features: this location has a cave
// items: this location has a pickaxe
// monsters: this location has a goblin
// name: this location is called "Ll"
