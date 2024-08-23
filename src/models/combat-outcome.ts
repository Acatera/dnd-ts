import { IMonster } from "../interfaces/monster";
import { ICombatant } from "../interfaces/combatant";

export class CombatOutcome {
    player: ICombatant;
    enemy: IMonster;
    
    constructor(player: ICombatant, enemy: IMonster) {
        this.player = player;
        this.enemy = enemy;
    }
}