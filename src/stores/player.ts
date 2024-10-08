import { writable } from "svelte/store";
import { Player } from "../types/Player";
import { inventoryStore } from "./inventory";
import { EquipmentSlotType } from "../types/EquipmentSlotType";
import { Item } from "../types/Item";

// Export a writable store with the initial value of an empty object
// Also export a function to equip an a weapon and a function to equip an armor

export const playerStore = writable<Player>();

export function equipItem(item: Item): boolean {

    let couldEquip = false;
    playerStore.update((p) => {
        if (p.equip(item)) {
            inventoryStore.update((i) => i);
            couldEquip = true;
        }

        return p;
    });

    return couldEquip;
}

export function unequip(slot: EquipmentSlotType): void {
    playerStore.update((p) => {
        p.unequip(slot);
        return p;
    });
}

export function deleteItem(item: Item): void {
    playerStore.update((p) => {
        if (p.inventory.removeAll(item.id)) {
            inventoryStore.update((i) => i);
        }
        return p;
    });
}