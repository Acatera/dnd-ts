import { IWeapon } from "../../interfaces/weapon";

export class Blaster implements IWeapon {
    minDamage: number = 1;
    maxDamage: number = 6;
    name: string = "Blaster";
    description: string = "A standard-issue blaster.";
}