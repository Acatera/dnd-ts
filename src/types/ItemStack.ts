import { Item } from "./Item";

export interface ItemStack {
    item: Item;
    quantity: number;
}

export function createItemStack(item: Item, quantity: number): ItemStack {
    return {
        item,
        quantity,
    };
}   