import { createEquippable, Equippable } from "./Equippable";
import { items } from "./Item";

export interface Armor extends Equippable {
    defense: number;
}

export function createArmor(id: string): Armor {
    if (!items[id]) {
        throw new Error(`Item with id ${id} not found`);
    }

    return {
        ...createEquippable(id),
        defense: items[id].defense,
    };
}