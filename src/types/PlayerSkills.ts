import { SkillType } from "./SkillType";


export type PlayerSkills = {
    [key in SkillType]: 
    {
        level: number;
        currentXp: number;
    };
};
