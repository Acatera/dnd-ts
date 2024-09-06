import { writable } from "svelte/store";
import { Inventory } from "../types/Inventory";

export const inventoryStore = writable<Inventory>();