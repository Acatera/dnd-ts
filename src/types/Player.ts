import { PlayerSkills } from "./skill-type";
import { Combatant } from "./Combatant";

export interface Player extends Combatant {
    experience: number,
    experienceToNextLevel: number,
    level: number,
    skills: PlayerSkills,
    skillPoints: number,
    attackRating: number,
}