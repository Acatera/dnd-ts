import { Combatant } from "../types/Combatant";
import { createAttacker } from "./createAttacker";

export function createCombatant(): Combatant {
    return {
        health: 10,
        maxHealth: 10,
        ...createAttacker(),
        receiveDamage(amount: number) {
            return 0;
        },
        get isAlive() {
            return this.health > 0;
        },
        idleTicks: 0,
        addIdleTicks() {
            this.idleTicks++;
        },
        resetIdleTicks() {
            this.idleTicks = 0;
        },
        attackSpeed: 20,
        evasion: 1
    };
}