import { writable } from 'svelte/store';
import { GameEvent } from "../types/GameEvent";
import { GameEventSource } from "../types/GameEventSource";

export const gameEvents = writable<GameEvent[]>([
    {
        message: "Welcome to RoguePunk!",
        source: GameEventSource.Game,
    }
]);