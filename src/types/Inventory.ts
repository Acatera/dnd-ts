import { ItemStack } from "./ItemStack";

export interface Inventory {
    items: ItemStack[];
    add(item: ItemStack): void;
    remove(item: ItemStack): void;
}

export function createInventory(): Inventory {
    const items: ItemStack[] = [];

    return {
        items,
        add(item: ItemStack) {
            items.push(item);
        },
        remove(item: ItemStack) {
            const index = items.indexOf(item);
            if (index !== -1) {
                items.splice(index, 1);
            }
        },
    };
}