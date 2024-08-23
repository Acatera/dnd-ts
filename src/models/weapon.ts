import { IWeapon } from "../interfaces/weapon";
import { Item } from "./item";

export class Weapon extends Item implements IWeapon {
    minDamage: number;
    maxDamage: number;

    constructor(data: { [key: string]: any }) {
        super(data);

        this.minDamage = data.minDamage;
        this.maxDamage = data.maxDamage;
    }
}