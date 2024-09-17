import { Component } from "./Component";

export class DefenseComponent implements Component {
    name = "Defense";
    defense: number;

    constructor(defense: number) {
        this.defense = defense;
    }
}