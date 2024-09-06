import { writable } from "svelte/store";
import { Monster } from "../types/Monster";

export const monsterStore = writable<Monster | null>();