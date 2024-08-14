import { ICombatant } from "./interfaces/combatant";
import { Player } from "./player";

export class Combat {
    #player: Player;
    #enemy: ICombatant;

    constructor(player: Player, enemy: ICombatant) {
        this.#player = player;
        this.#enemy = enemy;
    }
}