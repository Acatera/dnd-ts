import { IArmor } from "../interfaces/armor";
import { EquipmentSlotType } from "./equipment-slot-type";
import { EquippableItem } from "./equippable-item";

export class Armor extends EquippableItem implements IArmor {
    defense: number;

    constructor(id: string, data: any) {
        super(id, data);

        if (typeof data.defense !== 'number') {
            throw new Error(`Invalid defense value for armor: ${id}`);
        }

        // Ensure the slot value is a valid EquipmentSlotType value
        if (!Object.values(EquipmentSlotType).includes(data.slot)) {
            throw new Error(`Invalid slot value for armor: ${id}`);
        }

        this.defense = data.defense;
    }
}