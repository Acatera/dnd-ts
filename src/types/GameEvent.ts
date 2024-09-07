import { GameEventSource } from "./GameEventSource";


export interface GameEvent {
    message: string;
    source: GameEventSource;
}
