import { Monster } from "./Monster";
import { Player } from "./Player";

export interface Combat {
    player: Player;
    enemy: Monster;
}

export function createCombat(player: Player, enemy: Monster): Combat {
    return {
        player,
        enemy,
    };
}