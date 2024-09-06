import { Armor } from "./Armor";
import { createEquipmentSlot, EquipmentSlot } from "./EquipmentSlot";
import { EquipmentSlotType } from "./EquipmentSlotType";
import { createInventory, Inventory } from "./Inventory";
import { createItem } from "./Item";
import { createItemStack } from "./ItemStack";
import { Monster } from "./Monster";
import { PlayerSkills } from "./PlayerSkills";
import { SkillType } from "./SkillType";
import { Weapon } from "./Weapon";

export interface Player {
    health: number;
    maxHealth: number;
    isAlive(): boolean;

    canAttack(): boolean;
    attack(enemy: Monster): number;
    receiveDamage(amount: number): number;
    idleTicks: number;
    addIdleTicks(): void;
    resetIdleTicks(): void;

    attackSpeed: number;
    evasion: number;
    experience: number,
    experienceToLevelUp: number,
    level: number,
    skills: PlayerSkills,
    skillPoints: number,
    attackRating: number,
    gainExperience(amount: number): void,
    levelUp(): void,
    weaponSlot: EquipmentSlot<Weapon>;
    armorSlots: EquipmentSlot<Armor>[];
    inventory: Inventory;
}

const experienceLevels: number[] = [10, 15, 23, 34, 51, 76, 114, 171, 256, 384, 577, 865, 1297, 1946, 2919, 4379, 6568, 9853, 14779, 22168, 33253, 49879, 74818, 112227, 168341, 252512, 378768, 568151, 852227, 1278340, 1917511, 2876266, 4314399, 6471598, 9707397, 14561096, 21841644, 32762466, 49143699, 73715549, 110573323, 165859985, 248789977, 373184966, 559777449, 839666173, 1259499260, 1889248890, 2833873334, 4250810001, 6376215002, 9564322503, 14346483755, 21519725632, 32279588448, 48419382673, 72629074009, 108943611013, 163415416520, 245123124780, 367684687169, 551527030754, 827290546131, 1240935819196, 1861403728795, 2792105593192, 4188158389788, 6282237584682, 9423356377023, 14135034565535, 21202551848303, 31803827772454, 47705741658681, 71558612488021, 107337918732031, 161006878098047, 241510317147071, 362265475720606, 543398213580909, 815097320371364, 1222645980557050, 1833968970835570, 2750953456253350, 4126430184380030, 6189645276570040, 9284467914855070, 13926701872282600, 20890052808423900, 31335079212635800, 47002618818953800, 70503928228430700, 105755892342646000, 158633838513969000, 237950757770953000, 356926136656430000, 535389204984645000, 803083807476968000, 1204625711215450000, 1806938566823180000];

export function createPlayer(): Player {
    const createSkills = () => {
        return {
            Strength: 1,
            Stamina: 1,
            Agility: 1,
            Intelligence: 1,
            MaxHealth: 10,
            Evades: 1,
            Initiative: 1,
            Bow: 1,
            Pistol: 1,
            SMG: 1,
            Rifle: 1,
            Shotgun: 1,
            Heavy: 1,
            Energy: 1,
            Explosive: 1,
            Thrown: 1,
        };
    };

    const weaponSlot = createEquipmentSlot<Weapon>(EquipmentSlotType.Weapon, {
        name: "Fists",
        description: "Your fists are your only weapon",
        id: "fists",
        slot: EquipmentSlotType.Weapon,
        requirements: {},
        bonuses: {},
        minDamage: 1,
        maxDamage: 1,
        attackSpeed: 1,
        getPrimarySkill() {
            return SkillType.Strength;
        }
    });
    const armorSlots = [
        createEquipmentSlot<Armor>(EquipmentSlotType.Head),
        createEquipmentSlot<Armor>(EquipmentSlotType.Chest),
        createEquipmentSlot<Armor>(EquipmentSlotType.Hands),
        createEquipmentSlot<Armor>(EquipmentSlotType.Legs),
        createEquipmentSlot<Armor>(EquipmentSlotType.Feet),
    ];
    const inventory = createInventory();
    inventory.add(createItemStack(createItem("blaster"), 1));

    return {
        health: 10,
        receiveDamage(amount: number) {
            this.health -= amount;
            return amount;
        },
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
            attackSpeed -= this.skills.Initiative / 10;

            return Math.max(20, attackSpeed);
        },
        evasion: 1,
        experience: 0,
        experienceToLevelUp: experienceLevels[0] as number,
        level: 1,
        skillPoints: 0,
        skills: createSkills(),
        weaponSlot: weaponSlot,
        armorSlots: armorSlots,
        inventory: inventory,
        get maxHealth(): number {
            return this.skills.MaxHealth;
        },
        attack(enemy: Monster): number {
            if (!enemy.isAlive) {
                this.idleTicks = 0;
                return 0;
            }

            let damage = 5;
            const attackRating = this.attackRating;
            const defenseRating = enemy.evasion <= 0 ? 1 : enemy.evasion;
            const hitCoefficient = 25;
            const hitChance = (attackRating + hitCoefficient) / (attackRating + defenseRating + hitCoefficient);

            // if (weaponSlot.item) {
            //     const minDamage = weaponSlot.item.minDamage * (1 + attackRating / 400);
            //     const maxDamage = weaponSlot.item.maxDamage * (1 + attackRating / 400);
            //     damage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage);
            // }

            if (Math.random() > hitChance) {
                this.idleTicks -= this.attackSpeed;
                return -1;
            }

            this.idleTicks -= this.attackSpeed;
            return enemy.receiveDamage(damage);
        },
        get attackRating(): number {
            let attackRating = 1; // TODO: replace this with unarmed attack rating
            // if (weaponSlot.item) {
            //     const primarySkill = weaponSlot.item.getPrimarySkill();
            //     attackRating = this.getSkill(primarySkill);
            // }
            return attackRating;
        },
        gainExperience(amount: number) {
            this.experience = this.experience + amount;

            while (this.experience >= this.experienceToLevelUp) {
                this.levelUp();
            }
        },
        levelUp() {
            this.experience -= this.experienceToLevelUp;
            this.experienceToLevelUp = experienceLevels[this.level - 1] as number;
            this.level++;

            // Increase the player's health
            this.skills.MaxHealth += 1;

            // Increase the player's skills
            for (const skill in this.skills) {
                this.skills[skill as SkillType]++;
            }

            // Heal the player to full health
            this.health = this.maxHealth;
        }
    };
}