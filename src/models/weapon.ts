import { IWeapon } from "../interfaces/weapon";
import { Item } from "./item";

export class Weapon extends Item implements IWeapon {
    minDamage: number;
    maxDamage: number;
    attackSpeed: number;

    constructor(id: string, data: { [key: string]: any }) {
        super(id, data);

        this.minDamage = data.minDamage;
        this.maxDamage = data.maxDamage;
        this.attackSpeed = data.attackSpeed;
    }
}