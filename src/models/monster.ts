import Game, { LogSource } from "./game";
import { ICombatant } from "../interfaces/combatant";

export class Monster implements ICombatant {
    #experience: number = 0;
    health: number = 10;
    maxHealth: number = 10;

    get experience(): number {
        return this.#experience;
    }

    get isAlive(): boolean {
        return this.health > 0;
    }

    attack(opponent: ICombatant): void {
        if (opponent.isAlive) {
            opponent.receiveDamage(1);
        }
    }

    gainExperience(amount: number): void { }

    receiveDamage(amount: number): void {
        this.health -= amount;

        if (this.health <= 0) {
            this.health = 0;
        }
    }

    // This is a placeholder for now
    static createRandomMonster(): Monster {
        return new Monster();
    }
}