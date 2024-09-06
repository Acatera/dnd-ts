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

export function createCombatant(): Combatant {
    return {
        health: 10,
        maxHealth: 10,
        receiveDamage(amount: number) {
            this.health -= amount;
            console.log(`receiveDamage: ${amount}`);
            return amount;
        },
        get isAlive() {
            return this.health > 0;
        },
        idleTicks: 0,
        addIdleTicks() {
            this.idleTicks++;
        },
        get canAttack() {
            console.log(`canAttack: ${this.idleTicks} >= ${this.attackSpeed}`);
            return this.idleTicks >= this.attackSpeed;
        },
        getCanAttack(){
            console.log(`canAttack: ${this.idleTicks} >= ${this.attackSpeed}`);
            return this.idleTicks >= this.attackSpeed;
        },
        attack(enemy) {
            this.idleTicks -= this.attackSpeed;
            return 1;
        },
        resetIdleTicks() {
            this.idleTicks = 0;
        },
        attackSpeed: 20,
        evasion: 1
    };
}