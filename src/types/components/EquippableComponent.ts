import { Component } from "./Component";
import { EquipmentSlotType } from "../EquipmentSlotType";
import { SkillType } from "../SkillType";

export class EquippableComponent implements Component {
    name = "Equippable";
    slot: EquipmentSlotType;
    requirements: Partial<Record<SkillType, number>>;

    constructor(slot: EquipmentSlotType, requirements: Partial<Record<SkillType, number>> = {},) {
        this.slot = slot;
        this.requirements = requirements;
    }
}