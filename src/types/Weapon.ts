import { createEquippable, Equippable } from "./Equippable";
import { SkillType } from "./SkillType";

export interface Weapon extends Equippable {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;
    getPrimarySkill(): SkillType;
}

export function createWeapon(id: string): Weapon {
    return {
        ...createEquippable(id),
        minDamage: 1,
        maxDamage: 1,
        attackSpeed: 1,
        getPrimarySkill(): SkillType {
            // Primary skill is the skill that the weapon uses to calculate damage.
            // Highest requirement is the primary skill.

            let primarySkill = SkillType.Strength;
            let highestRequirement = 0;

            // Iterate over the requirements object.
            // If the requirement is higher than the highestRequirement, set the primarySkill to the current skill.
            // Return the primarySkill.
            for (const [skill, requirement] of Object.entries(this.requirements) as [keyof typeof SkillType, number][]) {
                debugger;
                if (requirement > highestRequirement) {
                    primarySkill = SkillType[skill];
                    highestRequirement = requirement;
                }
            }

            return primarySkill;
        }
    };
}