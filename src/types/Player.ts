import { PlayerSkills } from "./PlayerSkills";
import { Combatant } from "./Combatant";

export interface Player extends Combatant {
    experience: number,
    experienceToLevelUp: number,
    level: number,
    skills: PlayerSkills,
    skillPoints: number,
    attackRating: number,
}