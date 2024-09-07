import { writable } from "svelte/store";

export enum GameScreen {
    Loading,
    Game,
    Inventory
}

export const gameScreenStore = writable<GameScreen>(GameScreen.Loading);