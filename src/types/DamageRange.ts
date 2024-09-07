import { ValueRange } from "./ValueRange";

export class DamageRange implements ValueRange{
    min: number;
    max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    randomize(): number {
        return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    }
}