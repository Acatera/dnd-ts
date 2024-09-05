import { IWeapon } from "../interfaces/weapon";
import { EquippableItem as EquippableItem } from "./equippable-item";
import { SkillType } from "../../types/skill-type";

export class Weapon extends EquippableItem implements IWeapon {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;

    constructor(id: string, data: { [key: string]: any }) {
        super(id, data);

        this.minDamage = data.minDamage;
        this.maxDamage = data.maxDamage;
        this.attackSpeed = data.attackSpeed;
    }

    getPrimarySkill(): SkillType {
        // Primary skill is the skill that the weapon uses to calculate damage.
        // Highest requirement is the primary skill.

        let primarySkill = SkillType.Strength;
        let highestRequirement = 0;

        for (let skill in this.requirements) {
            if (this.requirements[skill] > highestRequirement) {
                primarySkill = SkillType[skill as keyof typeof SkillType];
                highestRequirement = this.requirements[skill];
            }
        }

    return primarySkill;
    }
}