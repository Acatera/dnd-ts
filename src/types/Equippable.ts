import { EquipmentSlotType } from "./EquipmentSlotType";
import { createItem, Item } from "./Item";
import { SkillType } from "./SkillType";

export interface Equippable extends Item {
    slot: EquipmentSlotType;
    requirements: ItemRequirements;
    bonuses: ItemBonuses;
}

export type ItemRequirements = Partial<Record<SkillType, number>>;

export type ItemBonuses = Partial<Record<SkillType, number>>;

export function createEquippable(id: string): Equippable {
    return {
        ...createItem(id),
        slot: EquipmentSlotType.Head,
        requirements: {},
        bonuses: {},
    };
}