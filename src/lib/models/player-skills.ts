import { SkillType } from "./skill-type";

export type PlayerSkills = {
    [key in SkillType]: number;
};