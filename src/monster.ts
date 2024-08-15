import Game, { LogSource } from "./game";
import { ICombatant } from "./interfaces/combatant";

export class Monster implements ICombatant {
    #game: Game;
    #experience: number = 0;

    get experience(): number {
        return this.#experience;
    }

    constructor(game: Game) {
        this.#game = game;
    }

    attack(): void {
        this.#game.addLog("The enemy attacks you!", LogSource.Enemy);
    }

    gainExperience(amount: number): void { }

    // This is a placeholder for now
    static createRandomMonster(game: Game) {
        return new Monster(game);
    }
}

