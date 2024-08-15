import { IWeapon } from "../../interfaces/weapon";

export class Fists implements IWeapon {
    minDamage = 1;
    maxDamage = 3;
    name = "Fists";
    description = "Your own two hands.";
}