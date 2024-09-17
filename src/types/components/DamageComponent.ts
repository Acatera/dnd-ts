import { DamageRange } from "../DamageRange";
import { Component } from "./Component";

export class DamageComponent implements Component {
    name = "Damage";
    damage: DamageRange;
    attackSpeed: number;

    constructor(minDamage: number, maxDamage: number, attackSpeed: number) {
        this.damage = new DamageRange(minDamage, maxDamage);
        this.attackSpeed = attackSpeed;
    }
}