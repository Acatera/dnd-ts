import { ItemStack } from "./ItemStack";

export interface Inventory {
    items: ItemStack[];
    add(item: ItemStack): void;
    remove(itemId: string): void;
}

export function createInventory(): Inventory {
    const items: ItemStack[] = [];

    return {
        items,
        add(item: ItemStack) {
            items.push(item);
        },
        remove(itemId: string) {
            const index = items.findIndex((itemStack) => itemStack.item.id === itemId);
            if (index !== -1) {
                items.splice(index, 1);

                return true;

            }
            return false;
        },
    };
}