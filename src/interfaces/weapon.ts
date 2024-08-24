import { IItem } from "./item";

export interface IWeapon extends IItem {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;
}