import { CombatOutcome } from "./combat-outcome";
import { Player } from "./player";
import { IMonster } from "../interfaces/monster";

export class Combat {
    #player: Player;
    #enemy: IMonster;

    onPlayersTurn: ((player: Player, monster: IMonster, damage: number) => void) | null = null;
    onMonstersTurn: ((player: Player, monster: IMonster, damage: number) => void) | null = null;
    onMonsterMiss: ((monster: IMonster) => void) | null = null;
    onMonsterDeath: ((monster: IMonster) => void) | null = null;

    constructor(player: Player, enemy: IMonster) {
        this.#player = player;
        this.#enemy = enemy;
    }

    simulate(): CombatOutcome {
        while (this.#player.isAlive && this.#enemy.isAlive) {
            if (this.#player.canAttack) {
                const playerDamage = this.#player.attack(this.#enemy);

                if (this.onPlayersTurn) {
                    this.onPlayersTurn(this.#player, this.#enemy, playerDamage);
                }

                if (!this.#enemy.isAlive) {

                    if (this.onMonsterDeath) {
                        this.onMonsterDeath(this.#enemy);
                    }

                    this.#player.gainExperience(this.#enemy.expReward);

                    break;
                }
            }

            if (this.#enemy.canAttack) {
                const enemyDamage = this.#enemy.attack(this.#player);

                if (enemyDamage === 0 && this.onMonsterMiss) {
                    this.onMonsterMiss(this.#enemy);
                }

                if (enemyDamage > 0 && this.onMonstersTurn) {
                    this.onMonstersTurn(this.#player, this.#enemy, enemyDamage);
                }

                if (!this.#player.isAlive) {
                    break;
                }
            }

            this.#player.addIdleTicks();
            this.#enemy.addIdleTicks();
        }

        return new CombatOutcome(this.#player, this.#enemy);
    }
}
