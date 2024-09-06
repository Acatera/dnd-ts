import { Monster } from "./Monster";
import { Player } from "./Player";

export interface Combat {
    player: Player;
    enemy: Monster;
    onPlayersTurn: ((player: Player, monster: Monster, damage: number) => void) | null;
    onPlayerMiss: ((player: Player) => void) | null
    onMonstersTurn: ((player: Player, monster: Monster, damage: number) => void) | null;
    onMonsterMiss: ((monster: Monster) => void) | null;
    onMonsterDeath: ((monster: Monster) => void) | null;
    onTurn: ((player: Player, monster: Monster) => void) | null;
    onCombatEnd: (() => void) | null;
    simulate(): void;
}

export function createCombat(player: Player, enemy: Monster): Combat {
    return {
        player,
        enemy,
        onPlayersTurn: null,
        onPlayerMiss: null,
        onMonstersTurn: null,
        onMonsterMiss: null,
        onMonsterDeath: null,
        onTurn: null,
        onCombatEnd: null,
        simulate() {
            console.log("Simulating combat");
            
            if (this.player.getCanAttack()) {
                const playerDamage = this.player.attack(this.enemy);

                if (this.onPlayerMiss && playerDamage < 0) {
                    this.onPlayerMiss(this.player);
                }

                if (this.onPlayersTurn && playerDamage >= 0) {
                    this.onPlayersTurn(this.player, this.enemy, playerDamage);
                }

                if (!this.enemy.isAlive) {

                    if (this.onMonsterDeath) {
                        this.onMonsterDeath(this.enemy);
                    }

                    this.player.gainExperience(this.enemy.expReward);

                    this.player.resetIdleTicks();
                    this.enemy.resetIdleTicks();

                    if (this.onCombatEnd) {
                        this.onCombatEnd();
                    }
                }
            }

            if (this.enemy.getCanAttack()) {
                const enemyDamage = this.enemy.attack(this.player);

                if (enemyDamage === 0 && this.onMonsterMiss) {
                    this.onMonsterMiss(this.enemy);
                }

                if (enemyDamage > 0 && this.onMonstersTurn) {
                    this.onMonstersTurn(this.player, this.enemy, enemyDamage);
                }

                if (!this.player.isAlive) {
                    this.player.resetIdleTicks();
                    this.enemy.resetIdleTicks();

                    if (this.onCombatEnd) {
                        this.onCombatEnd();
                    }
                }
            }

            if (this.onTurn) {
                this.onTurn(this.player, this.enemy);
            }

            this.player.addIdleTicks();
            this.enemy.addIdleTicks();

            console.log(`Player alive: ${this.player.isAlive}`);
            console.log(`Monster alive: ${this.enemy.isAlive}`);

            if (this.player.isAlive && this.enemy.isAlive) {
                setTimeout(() => {
                    this.simulate();
                }, 1000 / 20);
            }
        }
    };
}