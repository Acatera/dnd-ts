import { createItem } from "./Item";
import { createItemStack, ItemStack } from "./ItemStack";
import { createWeapon } from "./Weapon";

export interface Inventory {
    items: ItemStack[];
    add(item: ItemStack): void;
    remove(itemId: string): boolean;
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
            console.log(index);
            if (index !== -1) {
                items.splice(index, 1);

                return true;

            }
            return false;
        },
    };
}

export function loadInventory(state: any): Inventory {
    const inventory = createInventory();

    for (const itemStack of state.items) {
        if (itemStack.item.type === "Weapon")
        {
            const weapon = createWeapon(itemStack.item.id);
            itemStack.item = weapon;
        } else if (itemStack.item.type === "Armor") {
            const armor = createItem(itemStack.item.id);
            itemStack.item = armor;
        } else {
            const item = createItem(itemStack.item.id);
            itemStack.item = item;
        }

        inventory.add(itemStack);
    }

    return inventory;
}