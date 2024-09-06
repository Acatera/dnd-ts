import { writable } from "svelte/store";
import { Player } from "../types/Player";
import { Weapon } from "../types/Weapon";
import { Armor } from "../types/Armor";
import { inventoryStore } from "./inventory";

// Export a writable store with the initial value of an empty object
// Also export a function to equip an a weapon and a function to equip an armor

export const playerStore = writable<Player>();

export function equipWeapon(weapon: Weapon) {
    playerStore.update((p) => {
        if (p.wieldWeapon(weapon)) {
            inventoryStore.update((i) => i);
        }

        return p;
    });
}

export function equipArmor(armor: Armor) {
    playerStore.update((p) => {
        if (p.wearArmor(armor)) {
            inventoryStore.update((i) => i);
        }
        return p;
    });
}