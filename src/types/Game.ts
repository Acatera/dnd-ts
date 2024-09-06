import { gameArea } from "../stores/gameArea";
import { gameEvents } from "../stores/gameEvents";
import { playerStore } from "../stores/player";
import { Area, createArea } from "./Area";
import { Combat, createCombat } from "./Combat";
import { createPlayer, Player } from "./Player";

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

export function createGame(): Game {
    const player = createPlayer();
    playerStore.set(player);

    return {
        area: null as Area | null,
        combat: null as Combat | null,
        player: player,
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
            this.combat = createCombat(this.player, monster);

            this.combat.onPlayersTurn = (player, monster, damage) => {
                this.addEvent("You attacked the " + monster.name + " for " + damage + " damage.", GameEventSource.Player);
            };

            this.combat.onPlayerMiss = (player) => {
                this.addEvent("You missed the " + monster.name + ".", GameEventSource.Player);
            };

            this.combat.onMonstersTurn = (player, monster, damage) => {
                this.addEvent("The " + monster.name + " attacked you for " + damage + " damage.", GameEventSource.Enemy);
            };

            this.combat.onMonsterMiss = (monster) => {
                this.addEvent("The " + monster.name + " missed you.", GameEventSource.Enemy);
            };

            this.combat.onMonsterDeath = (monster) => {
                this.addEvent("You've defeated the " + monster.name + "!", GameEventSource.Enemy);
            };

            this.combat.onCombatEnd = () => {
                this.combat = null;
            };

            this.combat.simulate();
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

