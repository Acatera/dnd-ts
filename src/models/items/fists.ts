import { IWeapon } from "../../interfaces/weapon";
import { EquipmentSlotType } from "../equipment-slot-type";
import { SkillType } from "../skill-type";

export class Fists implements IWeapon {
    id = "fists";
    name = "Fists";
    description = "Your own two hands.";
    minDamage = 1;
    maxDamage = 3;
    attackSpeed = 10;
    slot: EquipmentSlotType = EquipmentSlotType.Weapon;
    requirements = {};
    bonuses = {};

    getPrimarySkill(): SkillType {
        return SkillType.Thrown;
    }
}