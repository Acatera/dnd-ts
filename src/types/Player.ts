import { Armor, createArmor } from "./Armor";
import { createCriticalDamage, CriticalDamage, loadCriticalDamage } from "./CriticalDamage";
import { DamageRange } from "./DamageRange";
import { calculateDamage, DamageResult, noDamage, noDamageMiss } from "./DamageResult";
import { createEquipmentSlot, EquipmentSlot } from "./EquipmentSlot";
import { EquipmentSlotType } from "./EquipmentSlotType";
import { ItemRequirements } from "./Equippable";
import { createInventory, Inventory, loadInventory } from "./Inventory";
import { createItem } from "./Item";
import { createItemStack } from "./ItemStack";
import { Monster } from "./Monster";
import { PlayerSkills } from "./PlayerSkills";
import { SkillType } from "./SkillType";
import { createWeapon, getPrimarySkill, Weapon } from "./Weapon";

export interface Player {
    health: number;
    maxHealth: number;
    isAlive(): boolean;

    canAttack(): boolean;
    attack(enemy: Monster): DamageResult;
    receiveDamage(damage: DamageResult): DamageResult;
    idleTicks: number;
    addIdleTicks(): void;
    resetIdleTicks(): void;

    criticalDamage: CriticalDamage;

    attackSpeed: number;
    evasion: number;
    experience: number,
    experienceToLevelUp: number,
    level: number,
    getTotalSkill(skill: SkillType): number,
    getBaseSkill(skill: SkillType): number,
    getSkillBonus(skill: SkillType): number,
    skillPoints: number,
    attackRating: number,
    armorRating: number,
    gainExperience(amount: number): void,
    gainSkillExperience(amount: number, skill: SkillType): void,
    levelUp(): void,
    weaponSlot: EquipmentSlot<Weapon>;
    armorSlots: EquipmentSlot<Armor>[];
    inventory: Inventory;
    meetsRequirements(requirements: ItemRequirements): boolean;
    wieldWeapon(weapon: Weapon): boolean;
    wearArmor(armor: Armor): boolean;
    unequip(slot: EquipmentSlotType): void;
}

const experienceLevels: number[] = [10, 15, 23, 34, 51, 76, 114, 171, 256, 384, 577, 865, 1297, 1946, 2919, 4379, 6568, 9853, 14779, 22168, 33253, 49879, 74818, 112227, 168341, 252512, 378768, 568151, 852227, 1278340, 1917511, 2876266, 4314399, 6471598, 9707397, 14561096, 21841644, 32762466, 49143699, 73715549, 110573323, 165859985, 248789977, 373184966, 559777449, 839666173, 1259499260, 1889248890, 2833873334, 4250810001, 6376215002, 9564322503, 14346483755, 21519725632, 32279588448, 48419382673, 72629074009, 108943611013, 163415416520, 245123124780, 367684687169, 551527030754, 827290546131, 1240935819196, 1861403728795, 2792105593192, 4188158389788, 6282237584682, 9423356377023, 14135034565535, 21202551848303, 31803827772454, 47705741658681, 71558612488021, 107337918732031, 161006878098047, 241510317147071, 362265475720606, 543398213580909, 815097320371364, 1222645980557050, 1833968970835570, 2750953456253350, 4126430184380030, 6189645276570040, 9284467914855070, 13926701872282600, 20890052808423900, 31335079212635800, 47002618818953800, 70503928228430700, 105755892342646000, 158633838513969000, 237950757770953000, 356926136656430000, 535389204984645000, 803083807476968000, 1204625711215450000, 1806938566823180000];

export function createPlayer(playerSkills: PlayerSkills | null = null): Player {
    const createSkills = () => {
        return {
            Strength: { level: 1, currentXp: 0 },
            Stamina: { level: 1, currentXp: 0 },
            Agility: { level: 1, currentXp: 0 },
            Intelligence: { level: 1, currentXp: 0 },
            MaxHealth: { level: 10, currentXp: 0 },
            Evades: { level: 1, currentXp: 0 },
            Initiative: { level: 1, currentXp: 0 },
            Bow: { level: 1, currentXp: 0 },
            Pistol: { level: 1, currentXp: 0 },
            SMG: { level: 1, currentXp: 0 },
            Rifle: { level: 1, currentXp: 0 },
            Shotgun: { level: 1, currentXp: 0 },
            Heavy: { level: 1, currentXp: 0 },
            Energy: { level: 1, currentXp: 0 },
            Explosive: { level: 1, currentXp: 0 },
            Thrown: { level: 1, currentXp: 0 },
            Unarmed: { level: 1, currentXp: 0 },
        };
    };

    const weaponSlot = createEquipmentSlot<Weapon>(EquipmentSlotType.Weapon, createWeapon("dev_overkill"));
    const armorSlots = [
        createEquipmentSlot<Armor>(EquipmentSlotType.Head),
        createEquipmentSlot<Armor>(EquipmentSlotType.Chest),
        createEquipmentSlot<Armor>(EquipmentSlotType.Hands),
        createEquipmentSlot<Armor>(EquipmentSlotType.Legs),
        createEquipmentSlot<Armor>(EquipmentSlotType.Feet),
    ];
    const inventory = createInventory();
    inventory.add(createItemStack(createWeapon("blaster"), 1));
    inventory.add(createItemStack(createArmor("plasteel_boots"), 1));
    const skills: PlayerSkills = playerSkills || createSkills();
    const criticalDamage = createCriticalDamage(1.5, 0.1);

    return {
        health: 10,
        isAlive() {
            return this.health > 0;
        },
        idleTicks: 0,
        addIdleTicks() {
            this.idleTicks++;
        },
        canAttack() {
            return this.idleTicks >= this.attackSpeed;
        },
        resetIdleTicks() {
            this.idleTicks = 0;
        },
        get attackSpeed(): number {
            let attackSpeed = 20;

            // TODO: add initiative bonus from gear

            // Add initiative bonus: for every 10 points of initiative, reduce attack speed by 1/20th of a second
            attackSpeed -= this.getTotalSkill(SkillType.Initiative) / 10;

            return Math.max(20, attackSpeed);
        },
        evasion: 1,
        experience: 0,
        experienceToLevelUp: experienceLevels[0] as number,
        level: 1,
        skillPoints: 0,
        getTotalSkill(skill: SkillType): number {
            return this.getBaseSkill(skill) + this.getSkillBonus(skill);
        },
        getBaseSkill(skill: SkillType): number {
            return skills[skill].level;
        },
        getSkillBonus(skill: SkillType): number {
            let bonus = 0;

            if (weaponSlot.item) {
                bonus += weaponSlot.item.bonuses[skill] || 0;
            }

            for (const slot of this.armorSlots) {
                if (slot.item) {
                    bonus += slot.item.bonuses[skill] || 0;
                }
            }

            return bonus;
        },

        weaponSlot: weaponSlot,
        armorSlots: armorSlots,
        inventory: inventory,

        get maxHealth(): number {
            return this.getTotalSkill(SkillType.MaxHealth);
        },

        attack(enemy: Monster): DamageResult {
            if (!enemy.isAlive) {
                this.idleTicks = 0;
                return noDamage;
            }

            const attackRating = this.attackRating;
            const defenseRating = enemy.evasion <= 0 ? 1 : enemy.evasion;
            const hitCoefficient = 25;
            const hitChance = (attackRating + hitCoefficient) / (attackRating + defenseRating + hitCoefficient);
            const damage = calculateDamage(weaponSlot.item ? weaponSlot.item.damageRange : new DamageRange(1, 1), this.criticalDamage);

            this.idleTicks -= this.attackSpeed;

            if (Math.random() > hitChance) {
                return noDamageMiss;
            }

            return enemy.receiveDamage(damage);
        },

        receiveDamage(damage: DamageResult): DamageResult {
            // Every 10 points of armor rating reduces damage by 1
            damage.amount -= this.armorRating / 10;

            if (damage.amount < 0) {
                damage.amount = 0;
            }

            if (damage.amount < 0) {
                damage.amount = 0;
            }

            if (damage.amount > this.health) {
                damage.amount = this.health;
            }

            this.health -= damage.amount;

            return damage;
        },

        criticalDamage,

        get armorRating(): number {
            let armorRating = 0;

            for (const slot of this.armorSlots) {
                if (slot.item) {
                    armorRating += slot.item.defense;
                }
            }

            return armorRating;
        },

        get attackRating(): number {
            let attackRating = this.getTotalSkill(SkillType.Unarmed);

            if (weaponSlot.item) {
                const primarySkill = getPrimarySkill(weaponSlot.item);
                attackRating = this.getTotalSkill(primarySkill);
            }

            return attackRating;
        },

        gainExperience(amount: number) {
            this.experience = this.experience + amount;

            while (this.experience >= this.experienceToLevelUp) {
                this.levelUp();
            }
        },

        gainSkillExperience(amount: number, skill: SkillType) {
            const skillObject = skills[skill];
            skillObject.currentXp += amount;

            while (skillObject.currentXp >= (experienceLevels[skillObject.level - 1] as number)) {
                skillObject.currentXp -= (experienceLevels[skillObject.level - 1] as number);
                skillObject.level++;
            }
        },

        levelUp() {
            this.experience -= this.experienceToLevelUp;
            this.experienceToLevelUp = experienceLevels[this.level - 1] as number;
            this.level++;

            // Increase the player's health
            skills.MaxHealth.level += 1;

            // Increase the player's skills
            for (const skill in skills) {
                skills[skill as SkillType].level++;
            }

            // Heal the player to full health
            this.health = this.maxHealth;
        },

        meetsRequirements(requirements: ItemRequirements): boolean {
            if (!requirements) {
                return true;
            }

            return Object.entries(requirements).every(([skill, level]) => {
                const skillType = skill as SkillType;
                return this.getTotalSkill(skillType) >= level;
            });
        },

        wieldWeapon(weapon: Weapon): boolean {
            // Weapon can be wielded if the player meets the requirements and the slot is correct
            if (this.meetsRequirements(weapon.requirements) && this.weaponSlot.slot === weapon.slot) {
                if (this.weaponSlot.item) {
                    this.inventory.add(createItemStack(this.weaponSlot.item, 1));
                }

                this.weaponSlot.item = weapon;

                this.inventory.remove(weapon.id);

                return true;
            }

            return false;
        },

        wearArmor(armor: Armor): boolean {
            // Armor can be equipped if the player meets the requirements and the slot is correct
            const armorSlot = this.armorSlots.find(slot => slot.slot === armor.slot);
            if (armorSlot && this.meetsRequirements(armor.requirements)) {

                if (armorSlot.item) {
                    this.inventory.add(createItemStack(armorSlot.item, 1));
                }

                armorSlot.item = armor;

                this.inventory.remove(armor.id);

                return true;
            }

            return false;
        },

        unequip(slot: EquipmentSlotType) {
            const armorSlot = this.armorSlots.find(s => s.slot === slot);
            if (armorSlot && armorSlot.item) {
                this.inventory.add(createItemStack(armorSlot.item, 1));
                armorSlot.item = null;
            } else if (this.weaponSlot.slot === slot) {
                if (this.weaponSlot.item) {
                    this.inventory.add(createItemStack(this.weaponSlot.item, 1));
                    this.weaponSlot.item = null;
                }
            }
        }
    };

}

export function loadPlayer(playerState: Player, playerSkills: PlayerSkills): Player {
    const player = createPlayer(playerSkills);

    player.health = playerState.health;
    player.idleTicks = playerState.idleTicks;
    player.criticalDamage = loadCriticalDamage(playerState.criticalDamage);
    player.evasion = playerState.evasion;
    player.experience = playerState.experience;
    player.level = playerState.level;
    player.skillPoints = playerState.skillPoints;

    player.weaponSlot = playerState.weaponSlot;
    player.armorSlots = playerState.armorSlots;
    player.inventory = loadInventory(playerState.inventory);

    return player;
}