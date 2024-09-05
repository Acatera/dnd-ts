import { Attacker } from "../types/Attacker";

export function createAttacker(): Attacker{
    return {
        canAttack: false,
        attack(enemy) {
            return 0;
        }
    }
}