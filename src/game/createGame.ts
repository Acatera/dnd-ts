import { Area } from "../types/Area";
import { Combat } from "../types/Combat";
import { Game, GameEvent, GameEventSource } from "../types/Game";
import { createArea } from "./createArea";
import { createPlayer } from "./createPlayer";
import { gameEvents } from "../stores/gameEvents";

export function createGame(): Game {
    return {
        area: null as Area | null,
        combat: null as Combat | null,
        player: createPlayer(),
        addEvent(message, source) {
            gameEvents.update((events: GameEvent[]) => {
                events.push({ message, source });
                if (events.length > 100) {
                    events.shift();
                }
                return events;
            });
        },
        loadArea(areaId) {
            this.area = createArea(areaId);
        },
        startCombat() {
            const monster = this.area.spawnEncounter();
            console.log(monster);
            this.addEvent("You've encountered a " + monster.name + "!", GameEventSource.Enemy);
            this.combat = {
                player: this.player,
                monster: monster,
            };
        },
    };
}

