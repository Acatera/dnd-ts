import { Monster } from "./Monster";

export interface Area {
    id: string;
    name: string;
    description: string;
    enemies: string[];
    spawnEncounter(): Monster | null
}