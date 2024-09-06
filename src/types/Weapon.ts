import { createEquippable, Equippable } from "./Equippable";
import { SkillType } from "./SkillType";
import { items } from "./Item";

export interface Weapon extends Equippable {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;
    getPrimarySkill(): SkillType;
}

export function createWeapon(id: string): Weapon {
    if (!items[id]) {
        throw new Error(`Item with id ${id} not found`);
    }

    return {
        ...createEquippable(id),
        minDamage: items[id].minDamage,
        maxDamage: items[id].maxDamage,
        attackSpeed: items[id].attackSpeed,
        getPrimarySkill(): SkillType {
            // Primary skill is the skill that the weapon uses to calculate damage.
            // Highest requirement is the primary skill.

            let primarySkill = SkillType.Strength;
            let highestRequirement = 0;

            // Iterate over the requirements object.
            // If the requirement is higher than the highestRequirement, set the primarySkill to the current skill.
            // Return the primarySkill.
            for (const [skill, requirement] of Object.entries(this.requirements) as [keyof typeof SkillType, number][]) {
                if (requirement > highestRequirement) {
                    primarySkill = SkillType[skill];
                    highestRequirement = requirement;
                }
            }

            return primarySkill;
        }
    };
}