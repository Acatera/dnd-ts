import { IMonster } from "../interfaces/monster";
import { ICombatant } from "../interfaces/combatant";

export class TurnResult{
    attackerDamage: number = 0;
    defenderDamage: number = 0;
    
    attacker: ICombatant;
    defender: IMonster;
    

    constructor(attacker: ICombatant, defender: IMonster){
        this.attacker = attacker;
        this.defender = defender;
    }
}