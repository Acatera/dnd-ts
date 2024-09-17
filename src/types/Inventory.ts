import { ItemStack } from "./ItemStack";

export interface Inventory {
    items: ItemStack[];
    add(item: ItemStack): void;
    remove(itemId: string, quantity: number): boolean;
    removeAll(itemId: string): boolean;
}

export function createInventory(): Inventory {
    const items: ItemStack[] = [];

    return {
        items,
        add(item: ItemStack) {
            items.push(item);
        },
        remove(itemId: string, quantity: number) {
            const index = items.findIndex((itemStack) => itemStack.itemId === itemId);
            if (index !== -1) {
                items[index]!.quantity -= quantity;
                if (items[index]!.quantity <= 0) {
                    items.splice(index, 1);
                }

                return true;
            }

            return false;
        },
        removeAll(itemId: string) {
            const index = items.findIndex((itemStack) => itemStack.itemId === itemId);
            console.log(index);
            if (index !== -1) {
                items.splice(index, 1);

                return true;

            }
            return false;
        },
    };
}

export function loadInventory(state: Inventory): Inventory {
    const inventory = createInventory();

    for (const itemStack of state.items) {
        inventory.add(itemStack);
    }

    return inventory;
}