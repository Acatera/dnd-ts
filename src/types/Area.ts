import { createLeveledMonster, Monster } from "./Monster";
import { ValueRange } from "./ValueRange";

export interface Area {
    id: string;
    name: string;
    description: string;
    combatLevel: ValueRange;
    enemies: string[];
    adjacentAreaIds: string[];
    spawnEncounter(): Monster | null;
}

let areas: { [key: string]: any } = {};

export async function loadAreaData() {
    const response = await fetch("data/area-data.json");
    const data = await response.json();
    areas = data;
}

export function getAreaName(id: string): string {
    if (!areas[id]) {
        throw new Error(`Area with id ${id} not found`);
    }

    return areas[id].name;
}

export function createArea(id: string): Area {
    if (!areas[id]) {
        throw new Error(`Area with id ${id} not found`);
    }

    return {
        id,
        ...areas[id],
        combatLevel: areas[id].combat_level as ValueRange,
        adjacentAreaIds: areas[id].adjacent_areas,
        spawnEncounter(): Monster | null {
            if (this.enemies.length < 0) {
                return null;
            }
    
            const randIndex = Math.floor(Math.random() * this.enemies.length);
            const randMonsterId = this.enemies[randIndex];

            if (!randMonsterId) {
                return null;
            }

            console.log(`Spawning monster with id ${randMonsterId}`);
            console.log(`Level range: ${this.combatLevel.min} - ${this.combatLevel.max}`);
            
            const randomLevel = Math.floor(Math.random() * (this.combatLevel.max - this.combatLevel.min + 1)) + this.combatLevel.min;
            
            console.log(`Random level: ${randomLevel}`);
            return createLeveledMonster(randMonsterId, randomLevel);
        }
    };
}