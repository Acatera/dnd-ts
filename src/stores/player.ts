import { writable } from "svelte/store";
import { Player } from "../types/Player";

export const playerStore = writable<Player>();