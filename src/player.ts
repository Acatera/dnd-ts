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

        this.addExperience(10);
    }

    addExperience(amount: number) {
        this.#experience += amount;
    }
}

export { Player };