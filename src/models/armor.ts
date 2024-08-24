import { IArmor } from "../interfaces/armor";
import { EquipmentSlotType } from "./equipment-slot-type";
import { Item } from "./item";

export class Armor extends Item implements IArmor {
    defense: number;
    slot: EquipmentSlotType;

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

        // Assign the slot value to the slot property. Translate the string value to the enum value.
        this.slot = EquipmentSlotType[data.slot as keyof typeof EquipmentSlotType];
    }
}