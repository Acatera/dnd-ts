import { writable } from 'svelte/store';
import { GameEvent, GameEventSource } from '../types/Game';

// This store will hold an array of GameEvent objects.
// Test this store by adding a few GameEvent objects to it, one for each GameEventSource.

export const gameEvents = writable<GameEvent[]>([
    {
        message: "Welcome to RoguePunk!",
        source: GameEventSource.Game,
    },
    {
        message: "You are a rogue in a cyberpunk world.",
        source: GameEventSource.Game,
    },
    // Player
    {
        message: "You have been hit!",
        source: GameEventSource.Player,
    },
    // Enemy
    {
        message: "The enemy has been hit!",
        source: GameEventSource.Enemy,
    },
    // Environment
    {
        message: "You have fallen into a pit!",
        source: GameEventSource.Environment,
    },
    // Item
    {
        message: "You have found a health pack!",
        source: GameEventSource.Item,
    }
]);