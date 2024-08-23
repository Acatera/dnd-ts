 import { ICombatant } from "../interfaces/combatant";

export class Monster implements ICombatant {
    #experience: number = 0;
    #id: string;
    expReward: number = 5;
    health: number = 10;
    maxHealth: number = 10;
    name: string = "Monster";

    constructor(id: string) {
        this.#id = id;
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

    // This is a placeholder for now
    static createRandomMonster(): Monster {
        return new Monster('');
    }
}
