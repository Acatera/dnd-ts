import { EquippableComponent } from "./components/EquippableComponent";
import { SkillType } from "./SkillType";

export function getPrimarySkill(equippable: EquippableComponent): SkillType {
    let primarySkill = SkillType.Strength;
    let highestRequirement = 0;

    // Iterate over the requirements object.
    // If the requirement is higher than the highestRequirement, set the primarySkill to the current skill.
    // Return the primarySkill.
    for (const [skill, requirement] of Object.entries(equippable.requirements) as [keyof typeof SkillType, number][]) {
        if (requirement > highestRequirement) {
            primarySkill = SkillType[skill];
            highestRequirement = requirement;
        }
    }

    return primarySkill;
}