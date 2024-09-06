import { Area } from "../types/Area";
import { Combat } from "../types/Combat";
import { Game, GameEvent, GameEventSource } from "../types/Game";
import { createArea } from "./createArea";
import { createPlayer } from "./createPlayer";
import { gameEvents } from "../stores/gameEvents";
import { gameArea } from "../stores/gameArea";

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
            gameArea.set(this.area);
        },
        startCombat() {
            if (!this.area) {
                return;
            }

            const monster = this.area.spawnEncounter();
            
            if (!monster) {
                this.addEvent("There are no enemies here.", GameEventSource.Environment);
                return;
            }

            this.addEvent("You've encountered a " + monster.name + "!", GameEventSource.Enemy);
            this.combat = {
                player: this.player,
                enemy: monster,
            };
        },
        travelToArea(areaId: string){
            this.loadArea(areaId);

            if (!this.area) {
                return;
            }
            
            this.addEvent("You've traveled to " + this.area.name, GameEventSource.Environment);
        }
    };
}

