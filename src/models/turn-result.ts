import { ICombatant } from "../interfaces/combatant";

export class TurnResult{
    attackerDamage: number = 0;
    defenderDamage: number = 0;
    
    attacker: ICombatant;
    defender: ICombatant;
    

    constructor(attacker: ICombatant, defender: ICombatant){
        this.attacker = attacker;
        this.defender = defender;
    }
}