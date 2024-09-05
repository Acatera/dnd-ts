import { Combatant } from "./Combatant";

export interface Monster extends Combatant {
    expReward: number;
    name: string;
    generateLoot(): string[];
}