import { ICombatant } from "../interfaces/combatant";

export class CombatOutcome {
    player: ICombatant;
    enemy: ICombatant;
    
    constructor(player: ICombatant, enemy: ICombatant) {
        this.player = player;
        this.enemy = enemy;
    }
}