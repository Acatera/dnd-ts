import { ICombatant } from "./combatant";

export interface IMonster extends ICombatant {
    expReward: number;
    name: string;
    attackSpeed: number;
    generateLoot(): string[];
}