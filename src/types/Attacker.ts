import { Combatant } from "./Combatant";

export interface Attacker {
    canAttack: boolean;
    attack(enemy: Combatant): number;
}
