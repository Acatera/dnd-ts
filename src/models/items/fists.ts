import { IWeapon } from "../../interfaces/weapon";

export class Fists implements IWeapon {
    id = "fists";
    minDamage = 1;
    maxDamage = 3;
    name = "Fists";
    attackSpeed = 10;
    description = "Your own two hands.";
}