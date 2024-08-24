import { EquipmentSlotType } from "../models/equipment-slot-type";
import { IItem } from "./item";
import { IItemRequirements } from "./item-requirements";

export interface IEquippable extends IItem {
    readonly slot: EquipmentSlotType;
    readonly requirements: IItemRequirements;
}