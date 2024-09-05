import { Attacker } from "./Attacker";

export interface Combatant extends Attacker {
    health: number;
    maxHealth: number;
    receiveDamage(amount: number): number;
    isAlive: boolean;
    idleTicks: number;
    addIdleTicks(): void;
    resetIdleTicks(): void;
    attackSpeed: number;
    evasion: number;
}