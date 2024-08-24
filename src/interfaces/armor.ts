import { EquipmentSlotType } from "../models/equipment-slot-type";
import { IItem } from "./item";

export interface IArmor extends IItem {
    defense: number;
    slot: EquipmentSlotType;
}