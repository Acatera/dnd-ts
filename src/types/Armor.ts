import { createEquippable, Equippable } from "./Equippable";

export interface Armor extends Equippable {
    defense: number;
}

export function createArmor(id: string): Armor {
    return {
        ...createEquippable(id),
        defense: 1,
    };
}