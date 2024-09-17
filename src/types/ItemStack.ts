export interface ItemStack {
    itemId: string;
    quantity: number;
}

export function createItemStack(itemId: string, quantity: number): ItemStack {
    return {
        itemId: itemId,
        quantity,
    };
}   