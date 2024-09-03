import { Monster } from "./monster";
import { MonsterFactory } from "../factories/monster-factory";

export class Area {
    id: string;
    name: string;
    description: string = '';
    enemies: string[] = [];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.enemies = data.enemies;
    }

    spawnEncounter(): Monster | null {
        if (this.enemies.length < 0) {
            return null;
        }

        const randIndex = Math.floor(Math.random() * this.enemies.length);
        const randMonsterId = this.enemies[randIndex];

        // return MonsterFactory.createMonster(randMonsterId);
        return MonsterFactory.createScaledMonster(randMonsterId, 5);
    }
}
// connections: this connects to a mine, a forest, and a mountain
// features: this location has a cave
// items: this location has a pickaxe
// monsters: this location has a goblin
// name: this location is called "Ll"
