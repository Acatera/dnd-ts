import { gameArea } from "../stores/gameArea";
import { gameEvents } from "../stores/gameEvents";
import { playerStore } from "../stores/player";
import { monsterStore } from "../stores/monsterStore";
import { Area, createArea } from "./Area";
import { Combat, createCombat } from "./Combat";
import { GameEvent } from "./GameEvent";
import { GameEventSource } from "./GameEventSource";
import { createPlayer, loadPlayer, Player } from "./Player";
import { createItem, getItemName, getItemType } from "./Item";
import { inventoryStore } from "../stores/inventory";
import { createItemStack } from "./ItemStack";
import { createWeapon, getPrimarySkill } from "./Weapon";
import { createArmor } from "./Armor";
import { combatStore } from "../stores/combatStore";
import { SkillType } from "./SkillType";
import { loadPlayerSkills, PlayerSkills } from "./PlayerSkills";

// If true, the player will gain experience in the skill they're using
// otherwise, the player will level up traditional RPG style
const dynamicSkilling = false;

export interface Game {
    area: Area | null;
    player: Player;
    combat: Combat | null;
    addEvent(message: string, source: GameEventSource): void;
    loadArea(areaId: string): void;
    travelToArea(areaId: string): void;
    startCombat(): void;
    abandonCombat(): void;
    load(): void;
    save(): void;
}

export function createGame(): Game {
    const player = createPlayer();
    playerStore.set(player);
    inventoryStore.set(player.inventory);

    return {
        area: null,
        combat: null,
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

            if (this.player.health <= 0) {
                this.addEvent("You're dead. You can't start combat.", GameEventSource.Game);
                return;
            }

            if (this.combat) {
                this.addEvent("You're already in combat.", GameEventSource.Game);
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
                if (damage.isCritical) {
                    this.addEvent("You hit the " + monster.name + " for " + damage.amount + " damage. Critical hit!", GameEventSource.Player);
                }
                else {
                    this.addEvent("You attacked the " + monster.name + " for " + damage.amount + " damage.", GameEventSource.Player);
                }
                monsterStore.set(monster);
            };

            this.combat.onPlayerMiss = (player) => {
                this.addEvent("You missed the " + monster.name + ".", GameEventSource.Game);
            };

            this.combat.onPlayerDeath = (player) => {
                this.addEvent("You've been defeated by the " + monster.name + ".", GameEventSource.Game);
                combatStore.set(null);
            }

            this.combat.onMonstersTurn = (player, monster, damage) => {
                if (damage.isCritical) {
                    this.addEvent("The " + monster.name + " hit you for " + damage.amount + " damage. Critical hit!", GameEventSource.Enemy);
                }
                else {
                    this.addEvent("The " + monster.name + " hit you for " + damage.amount + " damage.", GameEventSource.Enemy);
                }
                playerStore.set(this.player);
            };

            this.combat.onMonsterMiss = (monster) => {
                this.addEvent("The " + monster.name + " missed you.", GameEventSource.Game);
            };

            this.combat.onCombatAbandon = () => {
                this.addEvent("You've abandoned combat.", GameEventSource.Game);
                combatStore.set(null);
            }

            this.combat.onMonsterDeath = (monster) => {
                this.addEvent("You've defeated the " + monster.name + "!", GameEventSource.Game);

                // Update player experience and player store
                if (dynamicSkilling) {
                    const primarySkill = player.weaponSlot.item ? getPrimarySkill(player.weaponSlot.item!) : SkillType.Unarmed;
                    this.player.gainSkillExperience(monster.expReward, primarySkill);
                    this.addEvent(`You've gained ${monster.expReward}xp in ${SkillType[primarySkill]}!`, GameEventSource.Game);
                } else {
                    this.player.gainExperience(monster.expReward);
                    this.addEvent(`You've gained ${monster.expReward}xp.`, GameEventSource.Game);
                }

                playerStore.set(this.player);
                monsterStore.set(null);
                combatStore.set(null);

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
                combatStore.set(null);
            };

            combatStore.set(this.combat);

            this.combat.simulate();
        },

        abandonCombat() {
            if (!this.combat) {
                this.addEvent("You're not in combat.", GameEventSource.Game);
                return;
            }

            this.combat.abandon();

            this.combat = null;
        },

        travelToArea(areaId: string) {
            this.loadArea(areaId);

            if (!this.area) {
                return;
            }

            this.addEvent("You've traveled to " + this.area.name, GameEventSource.Environment);
        },

        load() {
            // Load the game state from local storage
            const state = localStorage.getItem("game");
            if (!state) {
                return;
            }

            const data = JSON.parse(state);
            
            const playerSkills = loadPlayerSkills(data.playerSkills);
            // Load the player
            this.player = loadPlayer(data.player, playerSkills);
            playerStore.set(this.player);

            // Load the area
            this.loadArea(data.area.id);
        },

        save() {
            // Seralize the game state

            const playerSkills: Record<SkillType, { level: number; currentXp: number; }> = 
            {} as Record<SkillType, {
                level: number;
                currentXp: number;
            }>;

            for (const skill in SkillType) {
                const playerSkill = this.player.getBaseSkill(SkillType[skill as keyof typeof SkillType]);
                playerSkills[SkillType[skill as keyof typeof SkillType]] = {
                    level: playerSkill,
                    currentXp: 0
                };
            }

            const state = {
                player: this.player,
                area: this.area,
                playerSkills: playerSkills
            };

            // Save to local storage
            localStorage.setItem("game", JSON.stringify(state));
        }
    };
}

