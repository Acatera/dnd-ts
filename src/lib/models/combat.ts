import { CombatOutcome } from "./combat-outcome";
import { Player } from "./player";
import { Monster } from "../../types/Monster";

export class Combat {
    #player: Player;
    #enemy: Monster;

    onPlayersTurn: ((player: Player, monster: Monster, damage: number) => void) | null = null;
    onPlayerMiss: ((player: Player) => void) | null = null
    onMonstersTurn: ((player: Player, monster: Monster, damage: number) => void) | null = null;
    onMonsterMiss: ((monster: Monster) => void) | null = null;
    onMonsterDeath: ((monster: Monster) => void) | null = null;

    onTurn: ((player: Player, monster: Monster) => void) | null = null;
    onCombatEnd: (() => void) | null = null;

    constructor(player: Player, enemy: Monster) {
        this.#player = player;
        this.#enemy = enemy;
    }

    simulate() {
        if (this.#player.canAttack) {
            const playerDamage = this.#player.attack(this.#enemy);

            if (this.onPlayerMiss && playerDamage < 0) {
                this.onPlayerMiss(this.#player);
            }

            if (this.onPlayersTurn && playerDamage >= 0) {
                this.onPlayersTurn(this.#player, this.#enemy, playerDamage);
            }

            if (!this.#enemy.isAlive) {

                if (this.onMonsterDeath) {
                    this.onMonsterDeath(this.#enemy);
                }

                this.#player.gainExperience(this.#enemy.expReward);

                this.#player.resetIdleTicks();
                this.#enemy.resetIdleTicks();

                if (this.onCombatEnd) {
                    this.onCombatEnd();
                }
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
                this.#player.resetIdleTicks();
                this.#enemy.resetIdleTicks();

                if (this.onCombatEnd) {
                    this.onCombatEnd();
                }
            }
        }

        if (this.onTurn) {
            this.onTurn(this.#player, this.#enemy);
        }

        this.#player.addIdleTicks();
        this.#enemy.addIdleTicks();

        console.log(`Player alive: ${this.#player.isAlive}`);
        console.log(`Monster alive: ${this.#enemy.isAlive}`);

        if (this.#player.isAlive && this.#enemy.isAlive) {
            setTimeout(() => {
                this.simulate();
            }, 1000 / 20);
        }
    }
}
