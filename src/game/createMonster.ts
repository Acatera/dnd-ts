import { Monster } from "../types/Monster";
import { Attacker } from "../types/Attacker";
import { createAttacker } from "./createAttacker";
import { createCombatant } from "./createCombatant";

let monsters = {};

export async function loadMonsterData() {
    const response = await fetch("data/monster-data.json");
    const data = await response.json();
    monsters = data;
}

export function createMonster(id: string): Monster & Attacker {
    if (!monsters[id]) {
        throw new Error(`Monster with id ${id} not found`);
    }
    
    return {
        ...createCombatant(),
        ...createAttacker(),
        expReward: 0,
        name: "",
        generateLoot() {
            return [];
        },
    };
}

export function getMonsterName(id: string): string {
    if (!monsters[id]) {
        return id;
    }
    
    return monsters[id].name;
}