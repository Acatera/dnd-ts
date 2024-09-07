import { writable } from "svelte/store";
import { Combat } from "../types/Combat";

export const combatStore = writable<Combat | null>(null);
