import { CombatOutcome } from "./combat-outcome";
import { ICombatant } from "./interfaces/combatant";
import { Player } from "./player";

export class Combat {
    #player: Player;
    #enemy: ICombatant;

    onTurn: ((player: Player, enemy: ICombatant) => void) | undefined;

    constructor(player: Player, enemy: ICombatant) {
        this.#player = player;
        this.#enemy = enemy;
    }

    simulate(): CombatOutcome {
        while (this.#player.isAlive && this.#enemy.isAlive) {
            this.turn();

            if (this.onTurn) {
                this.onTurn(this.#player, this.#enemy);
            }
        }

        if (!this.#enemy.isAlive) {
            this.#player.gainExperience(5);
        }

        return new CombatOutcome(this.#player, this.#enemy);
    }

    turn() {
        this.#player.attack(this.#enemy);

        if (this.#enemy.isAlive) {
            this.#enemy.attack(this.#player);
        }
    }
}