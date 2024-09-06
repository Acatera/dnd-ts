import { Area } from "./Area";
import { Combat } from "./Combat";
import { Player } from "./Player";

export interface Game {
    area: Area | null;
    player: Player;
    combat: Combat | null;
    addEvent(message: string, source: GameEventSource): void;
    loadArea(areaId: string): void;
    travelToArea(areaId: string): void;
    startCombat(): void;
}

export enum GameEventSource {
    Player,
    Enemy,
    Environment,
    Game,
    Item,
}

export interface GameEvent{
    message: string;
    source: GameEventSource;
}