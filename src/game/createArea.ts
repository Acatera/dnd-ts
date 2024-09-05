import { Area } from "../types/Area";
import { Monster } from "../types/Monster";
import { createMonster } from "./createMonster";

let areas = {};

export async function loadAreaData() {
    const response = await fetch("data/area-data.json");
    const data = await response.json();
    areas = data;
}

export function createArea(id: string): Area {
    if (!areas[id]) {
        throw new Error(`Area with id ${id} not found`);
    }

    return {
        id,
        ...areas[id],
        spawnEncounter(): Monster | null {
            if (this.enemies.length < 0) {
                return null;
            }
    
            const randIndex = Math.floor(Math.random() * this.enemies.length);
            const randMonsterId = this.enemies[randIndex];
    
            // return MonsterFactory.createMonster(randMonsterId);
            return createMonster(randMonsterId);
        }
    };
}