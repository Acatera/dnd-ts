import { EquipmentSlotType } from "./EquipmentSlotType";
import { createItem, Item, items } from "./Item";
import { SkillType } from "./SkillType";

export interface Equippable extends Item {
    slot: EquipmentSlotType;
    requirements: ItemRequirements;
    bonuses: ItemBonuses;
}

export type ItemRequirements = Partial<Record<SkillType, number>>;

export type ItemBonuses = Partial<Record<SkillType, number>>;

export function createEquippable(id: string): Equippable {
    if (!items[id]) {
        throw new Error(`Item with id ${id} not found`);
    }

    return {
        ...createItem(id),
        slot: items[id].slot,
        requirements: items[id].requirements || {},
        bonuses: items[id].bonuses || {},
    };
}