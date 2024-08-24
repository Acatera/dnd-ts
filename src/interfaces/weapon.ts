import { IEquippable } from "./equippable";

export interface IWeapon extends IEquippable {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;
}