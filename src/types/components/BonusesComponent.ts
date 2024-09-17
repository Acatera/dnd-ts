import { SkillType } from "../SkillType";
import { Component } from "./Component";

export class BonusesComponent implements Component {
    name = "Bonuses";
    bonuses: Partial<Record<SkillType, number>>;

    constructor(bonuses: Partial<Record<SkillType, number>>) {
        this.bonuses = bonuses;
    }
}