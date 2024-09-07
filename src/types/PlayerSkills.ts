import { SkillType } from "./SkillType";


export type PlayerSkills = {
    [key in SkillType]: number;
};
