import { Attacker } from "./Attacker";
import { Combatant, createCombatant } from "./Combatant";

export interface Monster extends Combatant {
    expReward: number;
    name: string;
    generateLoot(): string[];
}

let monsters: { [key: string]: any } = {};

export async function loadMonsterData() {
    const response = await fetch("data/monster-data.json");
    const data = await response.json();
    monsters = data;
}

export function createMonster(id: string): Monster & Attacker {
    if (!monsters[id]) {
        throw new Error(`Monster with id ${id} not found`);
    }

    const monster = {
        ...createCombatant(),
        ...monsters[id],
    };

    if (monster.attackSpeed === undefined) {
        monster.attackSpeed = 20;
    }

    return monster;
}

export function getMonsterName(id: string): string {
    const monster = monsters[id];
    if (!monster) {
        return "Unknown";
    }

    return monster.name;
}