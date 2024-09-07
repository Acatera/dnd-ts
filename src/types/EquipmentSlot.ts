import { EquipmentSlotType } from "./EquipmentSlotType";
import { Equippable } from "./Equippable";

export interface EquipmentSlot<T extends Equippable> {
    item: T | null;
    slot: EquipmentSlotType;
}

export function createEquipmentSlot<T extends Equippable>(slotType: EquipmentSlotType, item?: T): EquipmentSlot<T> {
    return {
        item: item || null,
        slot: slotType,
    };
}