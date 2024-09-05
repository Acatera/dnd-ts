import { Area } from "./Area";
import { Combat } from "./Combat";
import { Monster } from "./Monster";
import { Player } from "./Player";

export interface Game {
    area: Area;
    player: Player;
    combat: Combat | null;
    addEvent(message: string, source: GameEventSource): void;
    loadArea(areaId: string): void;
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