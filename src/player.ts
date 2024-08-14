import Game, { LogSource } from "./game";

class Player {
    #experience: number = 0;
    #game: Game;

    get experience(): number {
        return this.#experience;
    }

    constructor(game: Game) {
        this.#game = game;
    }

    attack() {
        this.#game.addLog("You attack the enemy!", LogSource.Player);

        // 5% chance to gain 10 experience
        if (Math.random() < 0.05) {
            this.gainExperience(10);
        }
    }

    gainExperience(amount: number) {
        this.#experience += amount;
    }
}

export { Player };