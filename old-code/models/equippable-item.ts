import { IItemRequirements } from "../interfaces/item-requirements";
import { IEquippable } from "../interfaces/equippable";
import { EquipmentSlotType } from "./equipment-slot-type";
import { Item } from "./item";
import { IItemBonuses } from "../interfaces/item-bonuses";

export class EquippableItem extends Item implements IEquippable {
    slot: EquipmentSlotType;
    requirements: IItemRequirements;
    bonuses: IItemBonuses;

    constructor(id: string, data: { [key: string]: any }) {
        super(id, data);

        this.slot = EquipmentSlotType[data.slot as keyof typeof EquipmentSlotType];
        this.requirements = data.requirements;
        this.bonuses = data.bonuses;
    }
}