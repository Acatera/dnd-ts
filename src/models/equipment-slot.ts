import { IItem } from "../interfaces/item";
import { EquipmentSlotType } from "./equipment-slot-type";

export class EquipmentSlot<T extends IItem> {
    #slot: EquipmentSlotType;

    item: T | null = null;

    get slot(): EquipmentSlotType {
        return this.#slot;
    }

    constructor(slotType: EquipmentSlotType) {
        this.#slot = slotType;
    }
}