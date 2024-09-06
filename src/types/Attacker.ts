import { Combatant } from "./Combatant";

export interface Attacker {
    canAttack: boolean;
    getCanAttack(): boolean;
    attack(enemy: Combatant): number;
}
