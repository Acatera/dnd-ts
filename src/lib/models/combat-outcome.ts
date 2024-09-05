import { Monster } from "../../types/Monster";
import { Combatant } from "../../types/Combatant";

export class CombatOutcome {
    player: Combatant;
    enemy: Monster;
    
    constructor(player: Combatant, enemy: Monster) {
        this.player = player;
        this.enemy = enemy;
    }
}