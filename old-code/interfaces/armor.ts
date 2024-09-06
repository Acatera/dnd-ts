import { EquipmentSlotType } from "../models/equipment-slot-type";
import { IEquippable } from "./equippable";

export interface IArmor extends IEquippable {
    defense: number;
}