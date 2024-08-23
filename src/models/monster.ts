 import { ICombatant } from "../interfaces/combatant";

export class Monster implements ICombatant {
    #experience: number = 0;
    expReward: number = 5;
    health: number = 10;
    maxHealth: number = 10;
    name: string = "Monster";

    constructor(monsterData: any) {
        this.name = monsterData.name;
        this.maxHealth = monsterData.health;
        this.health = monsterData.health;
        this.expReward = monsterData.expReward;
    }

    get experience(): number {
        return this.#experience;
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

    gainExperience(amount: number): void { }

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
