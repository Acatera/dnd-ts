import { IItem } from "../interfaces/item";

export class ItemStack {
    #item: IItem;
    #quantity: number;

    static readonly maxStackSize = 64;

    constructor(item: IItem, quantity: number) {
        this.#item = item;
        this.#quantity = quantity;
    }

    get item() {
        return this.#item;
    }

    get quantity() {
        return this.#quantity;
    }

    /**
     * Adds the specified quantity to the stack.
     * @param quantity The quantity to add.
     * @returns The remainder of the quantity that could not be added.
     */
    add(quantity: number): number {
        this.#quantity += quantity;

        if (this.#quantity > ItemStack.maxStackSize) {
            const remainder = this.#quantity - ItemStack.maxStackSize;
            this.#quantity = ItemStack.maxStackSize;
            return remainder;
        }

        return 0;
    }

    /**
     * Removes the specified quantity from the stack.
     * @param quantity The quantity to remove.
     * @returns The actual quantity removed.
     */
    remove(quantity: number): number {
        if (quantity > this.#quantity) {
            quantity = this.#quantity;
        }

        this.#quantity -= quantity;
        return quantity;
    }
}