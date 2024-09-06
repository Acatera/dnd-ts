import { SkillType } from "../../types/SkillType";
import { IEquippable } from "./equippable";

export interface IWeapon extends IEquippable {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;
    getPrimarySkill(): SkillType;
}