import { writable } from "svelte/store";
import { Area } from "../types/Area";

export const gameArea = writable<Area>();