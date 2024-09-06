import { EquipmentSlotType } from "./EquipmentSlotType";
import { Item } from "./Item";

export interface EquipmentSlot<T extends Item> {
    item: T | null;
    slot: EquipmentSlotType;
}

export function createEquipmentSlot<T extends Item>(slotType: EquipmentSlotType, item?: T): EquipmentSlot<T> {
    return {
        item: item || null,
        slot: slotType,
    };
}