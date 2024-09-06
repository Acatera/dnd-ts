import { createEquippable, Equippable } from "./Equippable";
import { items } from "./Item";
import { SkillType } from "./SkillType";

export interface Weapon extends Equippable {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;
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
        
    };
}

export function getPrimarySkill(weapon: Weapon): SkillType {
    let primarySkill = SkillType.Strength;
    let highestRequirement = 0;

    // Iterate over the requirements object.
    // If the requirement is higher than the highestRequirement, set the primarySkill to the current skill.
    // Return the primarySkill.
    for (const [skill, requirement] of Object.entries(weapon.requirements) as [keyof typeof SkillType, number][]) {
        if (requirement > highestRequirement) {
            primarySkill = SkillType[skill];
            highestRequirement = requirement;
        }
    }

    return primarySkill;
}