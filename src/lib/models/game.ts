import { Combat } from "./combat";
import { Player } from "./player";
import { Area } from "./area";
import { AreaFactory } from "../factories/area-factory";
import { MonsterFactory } from "../factories/monster-factory";
import { ItemFactory } from "../factories/item-factory";
import { IMonster } from "../interfaces/monster";
import { EquipmentSlotType } from "./equipment-slot-type";
import { SkillType } from "./skill-type";
import { ItemStack } from "./item-stack";

export class Game {
    #player: Player;
    #area: Area;

    constructor() {
        this.#player = new Player(this);
        this.#area = new Area({ id: 'test', name: 'Test Area' });
    }

    async start() {
        await this.init();

        this.addLog("Welcome to RoguePunk!");
        this.addLog("You are a rogue in a cyberpunk world.");

        this.#area = AreaFactory.createArea("drone_factory");
        this.#updateMapPanel();
    }

    async init() {
        await MonsterFactory.loadMonsterData();
        await AreaFactory.loadAreaData();
        await ItemFactory.loadItemData();

        this.initPlayerSkillPanel();
    }

    initPlayerSkillPanel() {
        const skillsPanel = document.getElementById('char-skills');
        if (skillsPanel) {
            skillsPanel.innerHTML = '';

            for (const skill of Object.keys(SkillType)) {
                const skillName = skill.charAt(0).toLowerCase() + skill.slice(1);
                const skillElement = document.createElement('div');
                skillElement.classList.add('char-skills-item');

                const skillLabel = document.createElement('label');
                skillLabel.textContent = skill;
                skillElement.appendChild(skillLabel);

                const skillValue = document.createElement('span');
                skillValue.textContent = `${this.#player.getSkill(skill as SkillType)}`;
                skillValue.id = `char-skill-${skillName}`;
                skillElement.appendChild(skillValue);

                skillsPanel.appendChild(skillElement);
            }
        }
    }

    attack() {
        if (!this.#player.isAlive) {
            return;
        }

        const combat = this.createCombat();
        combat.simulate();
    }

    addLog(message: string, source: LogSource = LogSource.Game) {
        const logElement = document.getElementById('logs');
        if (logElement) {
            const line = document.createElement('p');
            if (source === LogSource.Game) {
                line.style.color = 'darkgrey';
            }

            if (source === LogSource.Player) {
                line.style.color = 'lightgreen';
            }

            if (source === LogSource.Enemy) {
                line.style.color = 'lightcoral';
            }

            if (source === LogSource.Item) {
                line.style.color = 'lightblue';
            }

            line.classList.add('log-line');
            line.textContent = message;
            logElement.appendChild(line);

            // Scroll to the bottom of the log
            logElement.scrollTop = logElement.scrollHeight;

            if (logElement.children.length > 100) {
                logElement.removeChild(logElement.children[0]);
            }
        }
    }

    updatePlayerInfoPanel() {
        const charInfo = document.getElementById('char-info');
        if (charInfo) {
            // Update the player's health as a bar
            let healthElement = document.getElementById('char-health-current') as HTMLDivElement | null;

            if (healthElement) {
                healthElement.style.width = `${(this.#player.health / this.#player.maxHealth) * 100}%`;
            }

            // Update the player's experience as a bar
            let experienceElement = document.getElementById('char-experience-current') as HTMLDivElement | null;

            if (experienceElement) {
                experienceElement.style.width = `${(Number(this.#player.experience) / Number(this.#player.experienceLevels[this.#player.level - 1])) * 100}%`;
            }

            // Update the player's level
            let levelElement = document.getElementById('char-level') as HTMLParagraphElement | null;

            if (!levelElement) {
                levelElement = document.createElement('p');
                levelElement.id = 'char-level';
                levelElement.classList.add('char-info-line');
                charInfo.appendChild(levelElement);
            }

            levelElement.innerHTML = `Level: ${this.#player.level}`;
        }

        const equipmentPanel = document.getElementById('char-equipment');
        if (equipmentPanel) {
            const weaponSlot = document.getElementById('char-equipment-weapon');
            if (weaponSlot) {
                weaponSlot.innerHTML = `${this.#player.weaponSlot.item?.name || 'None'}`;
            }

            const headSlot = document.getElementById('char-equipment-head');
            if (headSlot) {
                headSlot.innerHTML = `${this.#player.armorSlots[EquipmentSlotType.Head].item?.name || 'None'}`;
            }

            const chestSlot = document.getElementById('char-equipment-chest');
            if (chestSlot) {
                chestSlot.innerHTML = `${this.#player.armorSlots[EquipmentSlotType.Chest].item?.name || 'None'}`;
            }

            const legsSlot = document.getElementById('char-equipment-legs');
            if (legsSlot) {
                legsSlot.innerHTML = `${this.#player.armorSlots[EquipmentSlotType.Legs].item?.name || 'None'}`;
            }

            const feetSlot = document.getElementById('char-equipment-feet');
            if (feetSlot) {
                feetSlot.innerHTML = `${this.#player.armorSlots[EquipmentSlotType.Feet].item?.name || 'None'}`;
            }

            const handsSlot = document.getElementById('char-equipment-hands');
            if (handsSlot) {
                handsSlot.innerHTML = `${this.#player.armorSlots[EquipmentSlotType.Hands].item?.name || 'None'}`;
            }
        }

        const skillsPanel = document.getElementById('char-skills');
        if (skillsPanel) {
            for (const skill of Object.keys(SkillType)) {
                const skillName = skill.charAt(0).toLowerCase() + skill.slice(1);
                const skillElement = document.getElementById(`char-skill-${skillName}`);
                if (skillElement) {
                    skillElement.innerHTML = `${this.#player.getSkill(skill as SkillType)}`;
                }
            }
        }
    }

    #updateMapPanel() {
        const nameElement = document.getElementById('area-name');
        if (nameElement) {
            nameElement.textContent = this.#area.name;
        }

        const descElement = document.getElementById('area-desc');
        if (descElement) {
            descElement.textContent = this.#area.description;
        }

        const mobListElement = document.getElementById('area-mob-list');
        if (mobListElement) {
            mobListElement.innerHTML = '';

            for (const mob of this.#area.enemies) {
                const mobElement = document.createElement('li');
                const mobName = MonsterFactory.getMonsterName(mob);
                mobElement.textContent = mobName;
                mobListElement.appendChild(mobElement);
            }
        }
    }

    createCombat() {
        const enemy = this.#createEnemy();
        const combat = new Combat(this.#player, enemy);
        combat.onMonstersTurn = (player, monster, damage) => {
            this.addLog(`${monster.name} attacks you for ${damage} damage.`, LogSource.Enemy);
        }

        combat.onMonsterMiss = (monster) => {
            this.addLog(`${monster.name} misses you!`, LogSource.Enemy);
        }

        combat.onPlayersTurn = (player, monster, damage) => {
            this.addLog(`You attack ${monster.name} for ${damage} damage with your ${player.weaponSlot.item?.name}.`, LogSource.Player);
        }

        combat.onPlayerMiss = (player) => {
            this.addLog('You miss your attack!', LogSource.Game);
        }

        combat.onTurn = (player, monster) => {
            this.#updateAttackSpeedBars(player, monster);
        }

        combat.onCombatEnd = () => {
            if (!this.#player.isAlive) {
                this.addLog("You've been defeated!", LogSource.Game);
            }

            this.updatePlayerInfoPanel();
        }

        combat.onMonsterDeath = (monster) => {
            this.addLog(`You've defeated the ${monster.name} and gained ${monster.expReward} experience!`, LogSource.Game);

            const loot = monster.generateLoot();
            for (const item of loot) {
                const itemType = ItemFactory.getItemType(item);

                if (itemType === 'armor') {
                    const newItem = ItemFactory.createArmor(item);
                    this.addLog(`You found a ${newItem.name}!`, LogSource.Item);

                    // Automatically equip the armor if it's better than what the player has
                    const currentArmor = this.#player.armorSlots[newItem.slot].item;
                    if (currentArmor) {
                        if (newItem.defense > currentArmor.defense) {
                            if (this.#player.equipArmor(newItem)) {
                                this.addLog(`You equip the ${newItem.name}.`, LogSource.Item);
                            } else {
                                this.#player.inventory.push(new ItemStack(newItem, 1));
                                this.addLog(`You can't equip the ${newItem.name}.`, LogSource.Item);
                            }
                        }
                    } else {
                        if (this.#player.equipArmor(newItem)) {
                            this.addLog(`You equip the ${newItem.name}.`, LogSource.Item);
                        } else {
                            this.#player.inventory.push(new ItemStack(newItem, 1));
                            this.addLog(`You can't equip the ${newItem.name}.`, LogSource.Item);
                        }
                    }
                    continue;
                }

                if (itemType === 'weapon') {
                    const newItem = ItemFactory.createWeapon(item);
                    if (this.#player.weaponSlot.item?.id === 'blaster') {
                        this.#player.inventory.push(new ItemStack(newItem, 1));
                        this.addLog(`You found a ${newItem.name}! You put it in your inventory.`, LogSource.Item);
                        continue;
                    }
                    if (this.#player.wieldWeapon(newItem)) {
                        this.addLog(`You found a ${newItem.name}! You equip it immediately.`, LogSource.Item);
                        continue;
                    } else {
                        this.#player.inventory.push(new ItemStack(newItem, 1));
                        this.addLog(`You found a ${newItem.name}! You can't equip it, so you put it in your inventory.`, LogSource.Item);
                        continue;
                    }
                    continue;
                }

                this.addLog(`You found a ${item}!`, LogSource.Item);
            }
        }

        return combat;
    }

    #updateAttackSpeedBars(player: Player, monster: IMonster) {
        const attackerAttackSpeedElement = document.getElementById('attacker-attack-speed-progress');
        const defenderAttackSpeedElement = document.getElementById('defender-attack-speed-progress');

        const attackerTimeLeft = Math.max(player.idleTicks / (player.attackSpeed), 0);
        const defenderTimeLeft = Math.max(monster.idleTicks / monster.attackSpeed, 0);

        if (attackerAttackSpeedElement && defenderAttackSpeedElement) {
            attackerAttackSpeedElement.style.width = `${attackerTimeLeft * 100}%`;
            defenderAttackSpeedElement.style.width = `${defenderTimeLeft * 100}%`;
        }

        console.log('Attacker time left:', attackerTimeLeft);
        console.log('Defender time left:', defenderTimeLeft);

        const healthElement = document.getElementById('char-health-current');

        if (healthElement) {
            healthElement.style.width = `${(this.#player.health / this.#player.maxHealth) * 100}%`;
        }
    }

    toggleInventory() {
        const inventoryPanel = document.getElementById('inventory-container');
        if (inventoryPanel) {
            if (inventoryPanel.classList.contains('hidden')) {
                this.updatePlayerInventory();
                inventoryPanel.classList.remove('hidden');
            } else {
                inventoryPanel.classList.add('hidden');
            }
        }
    }

    updatePlayerInventory() {
        const inventoryPanel = document.getElementById('inventory-items');
        if (inventoryPanel) {
            inventoryPanel.innerHTML = '';
            
            for (const itemStack of this.#player.inventory) {
                const itemElement = document.createElement('div');
                itemElement.classList.add('inventory-item');

                const itemLabel = document.createElement('label');
                itemLabel.textContent = itemStack.item.name;
                itemElement.appendChild(itemLabel);

                const itemValue = document.createElement('span');
                itemValue.textContent = itemStack.item.description;
                itemValue.id = `inventory-${itemStack.item.id}`;
                itemElement.appendChild(itemValue);

                inventoryPanel.appendChild(itemElement);
            }
        }
    }

    #createEnemy(): IMonster {
        if (this.#area) {
            const monster = this.#area.spawnEncounter();

            if (monster) {
                return monster;
            }
        }

        return MonsterFactory.createRandomMonster();
    }
}

export enum LogSource {
    Game,
    Player,
    Enemy,
    Item,
    Environment,
}

export default Game;
