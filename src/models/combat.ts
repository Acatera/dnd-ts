import { CombatOutcome } from "./combat-outcome";
import { ICombatant } from "../interfaces/combatant";
import { Player } from "./player";
import { TurnResult } from "./turn-result";
import { IMonster } from "../interfaces/monster";

export class Combat {
    #player: Player;
    #enemy: IMonster;

    onTurn: ((result: TurnResult) => void) | null = null;

    constructor(player: Player, enemy: IMonster) {
        this.#player = player;
        this.#enemy = enemy;
    }

    simulate(): CombatOutcome {
        while (this.#player.isAlive && this.#enemy.isAlive) {
            const turnResult = this.turn();

            if (this.onTurn) {
                this.onTurn(turnResult);
            }
        }

        if (!this.#enemy.isAlive) {
            this.#player.gainExperience(this.#enemy.expReward);
        }

        return new CombatOutcome(this.#player, this.#enemy);
    }

    turn(): TurnResult {
        const result = new TurnResult(this.#player, this.#enemy);

        result.attackerDamage = this.#player.attack(this.#enemy);
        result.defenderDamage = 0;

        if (this.#enemy.isAlive) {
            result.defenderDamage = this.#enemy.attack(this.#player);
        }

        return result;
    }
}
