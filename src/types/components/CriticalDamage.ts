import { Monster } from "../Monster";
import { Player } from "../Player";

export interface CriticalDamage {
    bonus: number;
    chance: number;
    roll(): boolean;
}

export function createCriticalDamage(bonus: number, chance: number): CriticalDamage {
    return {
        bonus,
        chance,
        roll() {
            return Math.random() < this.chance;
        }
    };
}