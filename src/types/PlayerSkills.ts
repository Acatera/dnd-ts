import { SkillType } from "./SkillType";


export type PlayerSkills = {
    [key in SkillType]: 
    {
        level: number;
        currentXp: number;
    };
};

export function loadPlayerSkills(state: any): PlayerSkills {
    const playerSkills: Record<SkillType, { level: number; currentXp: number; }> = 
    {} as Record<SkillType, {
        level: number;
        currentXp: number;
    }>;

    for (const skillType in state) {
        if (state.hasOwnProperty(skillType)) {
            const typedSkillType = skillType as SkillType;
            playerSkills[typedSkillType] = {
                level: state[typedSkillType].level,
                currentXp: state[typedSkillType].currentXp
            };
        }
    }

    return playerSkills;
}
