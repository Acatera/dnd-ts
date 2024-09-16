import { DamageRange } from "./DamageRange";
import { Player } from "./Player";
import { TieredMonsterDefinition } from "./TieredMonsterDefinition";
import { ValueRange } from "./ValueRange";
import { LootTable, LootTableEntry } from "./LootTable";
import { createCriticalDamage, CriticalDamage } from "./CriticalDamage";
import { calculateDamage, DamageResult, noDamage } from "./DamageResult";

let monsters: { [key: string]: any } = {};

export async function loadMonsterData() {
    const response = await fetch("data/monster-data.json");
    const data = await response.json();
    monsters = data;
}

export interface Monster {
    level: number;
    health: number;
    maxHealth: number;
    isAlive(): boolean;

    damageRange: DamageRange;
    canAttack(): boolean;
    attack(enemy: Player): DamageResult;
    receiveDamage(damage: DamageResult): DamageResult;
    idleTicks: number;
    addIdleTicks(): void;
    resetIdleTicks(): void;

    criticalDamage: CriticalDamage
    attackSpeed: number;
    evasion: number;
    expReward: number;
    name: string;
    attackRating: number;
    armorRating: number,
    generateLoot(): string[];
}

export function createLeveledMonster(id: string, level: number): Monster {
    if (!monsters[id]) {
        throw new Error(`Monster with id ${id} not found`);
    }

    const monsterData = monsters[id];

    const lootTableEntries: LootTableEntry<string>[] = [];
    if (monsterData.hasOwnProperty('loot_table')) {
        // loot_table is an array of [itemId, weight] pairs
        for (const [itemId, weight] of monsterData.loot_table) {
            lootTableEntries.push({ value: itemId, weight: weight });
        }
    }
    const lootTable = new LootTable<string>(lootTableEntries);

    if (!monsterData.hasOwnProperty('tiers')) {
        throw new Error(`Monster with id ${id} is not a tiered monster`);
    }

    const tieredMonsterData = monsterData as TieredMonsterDefinition;

    const tierKeys = Object.keys(tieredMonsterData.tiers).sort((a, b) => parseInt(a) - parseInt(b));
    // Find the highest tier that is less than or equal to the scale
    const lowTierKey = tierKeys.filter(key => parseInt(key) <= level).pop();
    if (!lowTierKey) {
        throw new Error(`No low tier found for scale ${level}`);
    }
    // Find the lowest tier that is greater than the scale
    const highTierKey = tierKeys.filter(key => parseInt(key) >= level).shift();
    if (!highTierKey) {
        throw new Error(`No high tier found for scale ${level}`);
    }

    // Calculate the percentage of the way between the low and high tiers
    const lowTier = tieredMonsterData.tiers[lowTierKey];
    const highTier = tieredMonsterData.tiers[highTierKey];
    const lowTierScale = parseInt(lowTierKey);
    const highTierScale = parseInt(highTierKey);
    let scalePercentage = (level - lowTierScale) / (highTierScale - lowTierScale);

    if (isNaN(scalePercentage)) {
        scalePercentage = 0;
    }

    if (!lowTier)
        throw new Error(`No low tier found for scale ${level}`);
    if (!highTier)
        throw new Error(`No high tier found for scale ${level}`);

    // Interpolate the values between the low and high tiers
    const damageRange = new DamageRange(
        Math.round(lowTier.minDamage + (highTier.minDamage - lowTier.minDamage) * scalePercentage) || 1,
        Math.round(lowTier.maxDamage + (highTier.maxDamage - lowTier.maxDamage) * scalePercentage) || 1
    );

    const criticalDamage = createCriticalDamage(1.5, 0.1);

    const monster = {
        level: level,
        name: tieredMonsterData.name || "Unknown",
        health: Math.round(lowTier.health + (highTier.health - lowTier.health) * scalePercentage),
        expReward: Math.round(lowTier.expReward + (highTier.expReward - lowTier.expReward) * scalePercentage) || 0,
        attackSpeed: Math.max(Math.round((lowTier.attackSpeed + (highTier.attackSpeed - lowTier.attackSpeed) * scalePercentage)) || 20, 20),
        maxHealth: Math.round(lowTier.health + (highTier.health - lowTier.health) * scalePercentage),
        evasion: Math.round(lowTier.evasion + (highTier.evasion - lowTier.evasion) * scalePercentage) || 1,
        attackRating: Math.round(lowTier.attackRating + (highTier.attackRating - lowTier.attackRating) * scalePercentage) || 1,
        armorRating: Math.round(lowTier.armorRating + (highTier.armorRating - lowTier.armorRating) * scalePercentage) || 1,
        damageRange: damageRange,
        criticalDamage: criticalDamage,
        idleTicks: 0,
        receiveDamage(damage: DamageResult) {
            // Reduce damage by armor rating
            damage.amount -= this.armorRating / 10;
            
            if (damage.amount < 0) {
                damage.amount = 0;
            }

            if (damage.amount > this.health) {
                damage.amount = this.health;
            }

            this.health -= damage.amount;

            return damage;
        },
        isAlive() {
            return this.health > 0;
        },
        addIdleTicks() {
            this.idleTicks++;
        },
        canAttack() {
            return this.idleTicks >= this.attackSpeed;
        },
        attack(enemy: Player) {
            this.idleTicks -= this.attackSpeed;

            const defenseRating = enemy.evasion <= 0 ? 1 : enemy.evasion;
            const hitCoefficient = 25;
            const hitChance = (this.attackRating + hitCoefficient) / (this.attackRating + defenseRating + hitCoefficient);

            const damage = calculateDamage(this.damageRange, this.criticalDamage);

            if (Math.random() < hitChance) {
                return enemy.receiveDamage(damage);
            }

            return noDamage;
        },
        resetIdleTicks() {
            this.idleTicks = 0;
        },
        generateLoot(): string[] {
            return lootTable.getNextValues();
        }
    };

    return monster;
}

export function getMonsterName(id: string): string {
    const monster = monsters[id];
    if (!monster) {
        return "Unknown";
    }

    return monster.name;
}