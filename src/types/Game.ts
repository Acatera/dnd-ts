import { gameArea } from "../stores/gameArea";
import { gameEvents } from "../stores/gameEvents";
import { playerStore } from "../stores/player";
import { monsterStore } from "../stores/monsterStore";
import { Area, createArea } from "./Area";
import { Combat, createCombat } from "./Combat";
import { GameEvent } from "./GameEvent";
import { GameEventSource } from "./GameEventSource";
import { createPlayer, Player } from "./Player";
import { createItem, getItemName, getItemType } from "./Item";
import { inventoryStore } from "../stores/inventory";
import { createItemStack } from "./ItemStack";
import { createWeapon } from "./Weapon";
import { createArmor } from "./Armor";

export interface Game {
    area: Area | null;
    player: Player;
    combat: Combat | null;
    addEvent(message: string, source: GameEventSource): void;
    loadArea(areaId: string): void;
    travelToArea(areaId: string): void;
    startCombat(): void;
}

export function createGame(): Game {
    const player = createPlayer();
    playerStore.set(player);
    inventoryStore.set(player.inventory);

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

            this.addEvent(`You've encountered a level ${monster.level} ${monster.name}!`, GameEventSource.Environment);
            this.combat = createCombat(this.player, monster);

            this.combat.onPlayersTurn = (player, monster, damage) => {
                this.addEvent("You attacked the " + monster.name + " for " + damage + " damage.", GameEventSource.Player);
                monsterStore.set(monster);
            };

            this.combat.onPlayerMiss = (player) => {
                this.addEvent("You missed the " + monster.name + ".", GameEventSource.Game);
            };

            this.combat.onPlayerDeath = (player) => {
                this.addEvent("You've been defeated by the " + monster.name + ".", GameEventSource.Game);
            }

            this.combat.onMonstersTurn = (player, monster, damage) => {
                this.addEvent("The " + monster.name + " attacked you for " + damage + " damage.", GameEventSource.Enemy);
                playerStore.set(this.player);
            };

            this.combat.onMonsterMiss = (monster) => {
                this.addEvent("The " + monster.name + " missed you.", GameEventSource.Game);
            };

            this.combat.onMonsterDeath = (monster) => {
                this.addEvent("You've defeated the " + monster.name + "!", GameEventSource.Game);
                this.addEvent("You've gained " + monster.expReward + " experience.", GameEventSource.Game);

                // Update player experience and player store
                this.player.gainExperience(monster.expReward);
                playerStore.set(this.player);
                monsterStore.set(null);

                const loot = monster.generateLoot();
                if (loot.length > 0) {
                    for (const itemId of loot) {
                        const itemType = getItemType(itemId);

                        switch (itemType) {
                            case "Weapon":
                                this.player.inventory.add(createItemStack(createWeapon(itemId), 1));
                                break;
                            case "Armor":
                                this.player.inventory.add(createItemStack(createArmor(itemId), 1));
                                break;
                            case "Consumable":
                                this.player.inventory.add(createItemStack(createItem(itemId), 1));
                                break;
                            case "Misc":
                                this.player.inventory.add(createItemStack(createItem(itemId), 1));
                                break;
                            default:
                                this.player.inventory.add(createItemStack(createItem(itemId), 1));
                                break;
                        }
                        this.addEvent(`You've found a ${getItemName(itemId)}!`, GameEventSource.Game);
                    }
                }
            };

            this.combat.onCombatEnd = () => {
                this.combat = null;
                monsterStore.set(null);
            };

            this.combat.simulate();
        },
        travelToArea(areaId: string) {
            this.loadArea(areaId);

            if (!this.area) {
                return;
            }

            this.addEvent("You've traveled to " + this.area.name, GameEventSource.Environment);
        }
    };
}

