import { writable } from "svelte/store";
import { ItemStack } from "../types/ItemStack";

export const inventoryStore = writable<ItemStack[]>([]);