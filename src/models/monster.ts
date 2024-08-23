import { IMonster } from "../interfaces/monster";
import { ICombatant } from "../interfaces/combatant";

export class Monster implements IMonster {
    expReward: number;
    health: number;
    maxHealth: number;
    name: string;

    constructor(monsterData: any) {
        this.name = monsterData.name;
        this.maxHealth = monsterData.health;
        this.health = monsterData.health;
        this.expReward = monsterData.expReward;
    }

    get isAlive(): boolean {
        return this.health > 0;
    }

    attack(opponent: ICombatant): number {
        if (opponent.isAlive) {
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
}
