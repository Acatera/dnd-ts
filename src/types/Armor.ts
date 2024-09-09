import { createEquippable, Equippable } from "./Equippable";
import { Item, items, ItemType } from "./Item";

export interface Armor extends Equippable {
    defense: number;
}

export function createArmor(id: string): Armor {
    if (!items[id]) {
        throw new Error(`Item with id ${id} not found`);
    }

    if (items[id].type !== "Armor") {
        throw new Error(`Item with id ${id} is not an armor`);
    }

    return {
        ...createEquippable(id),
        defense: items[id].defense,
    };
}