import { IItem } from "../interfaces/item";
import { EquipmentSlotType } from "./equipment-slot-type";

export class EquipmentSlot {
    #slotType: EquipmentSlotType;

    item: IItem | null = null;

    get slotType(): EquipmentSlotType {
        return this.#slotType;
    }

    constructor(slotType: EquipmentSlotType) {
        this.#slotType = slotType;
    }
}