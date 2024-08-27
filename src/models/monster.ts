import { IMonster } from "../interfaces/monster";
import { ICombatant } from "../interfaces/combatant";

export class Monster implements IMonster {
    #idleTicks: number = 0;
    expReward: number;
    health: number;
    maxHealth: number;
    name: string;
    attackSpeed: number = 20;
    evasion: number;
    drops: string[];

    constructor(monsterData: any) {
        if (!monsterData.name) {
            throw new Error("Monster data must have name property");
        }

        if (!monsterData.health) {
            throw new Error("Monster data must have health property");
        }

        if (!monsterData.expReward) {
            throw new Error("Monster data must have expReward property");
        }

        if (monsterData.attackSpeed) {
            this.attackSpeed = Math.max(monsterData.attackSpeed, 20);
        }

        this.name = monsterData.name;
        this.maxHealth = monsterData.health;
        this.health = monsterData.health;
        this.expReward = monsterData.expReward;
        this.evasion = monsterData.evasion || 1;
        this.drops = monsterData.drops || [];
    }

    get isAlive(): boolean {
        return this.health > 0;
    }

    get idleTicks(): number {
        return this.#idleTicks;
    }

    addIdleTicks(): void {
        this.#idleTicks++;
    }

    resetIdleTicks(): void {
        this.#idleTicks = 0;
    }
    
    get canAttack(): boolean {
        return this.#idleTicks >= this.attackSpeed;
    }

    attack(opponent: ICombatant): number {
        if (opponent.isAlive) {
            this.#idleTicks -= this.attackSpeed;
            return opponent.receiveDamage(1);
        }

        return 0;
    }

    receiveDamage(amount: number): number {
        if (amount > this.health) {
            amount = this.health;
        }

        if (amount < 0) {
            amount = 0;
        }

        this.health -= amount;

        return amount;
    }

    generateLoot(): string[] {
        if (this.drops.length === 0) {
            return [];
        } else {
            const loot: string[] = [];
            const dropCount = Math.ceil(Math.random() * this.drops.length);
            for (let i = 0; i < dropCount; i++) {
                loot.push(this.drops[Math.floor(Math.random() * this.drops.length)]);
            }
            return loot;
        }
    }
}
