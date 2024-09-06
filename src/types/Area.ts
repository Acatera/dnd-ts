import { Game } from "./Game";
import { Monster } from "./Monster";

export interface Area {
    id: string;
    name: string;
    description: string;
    enemies: string[];
    adjacentAreaIds: string[];
    spawnEncounter(): Monster | null;
}