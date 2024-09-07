import { DamageRange } from "./DamageRange";
import { Player } from "./Player";
import { TieredMonsterDefinition } from "./TieredMonsterDefinition";
import { ValueRange } from "./ValueRange";

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
    attack(enemy: Player): number;
    receiveDamage(amount: number): number;
    idleTicks: number;
    addIdleTicks(): void;
    resetIdleTicks(): void;

    attackSpeed: number;
    evasion: number;
    expReward: number;
    name: string;
    generateLoot(): string[];
}

export function createLeveledMonster(id: string, level: number): Monster {
    if (!monsters[id]) {
        throw new Error(`Monster with id ${id} not found`);
    }

    const monsterData = monsters[id];
    const lootTable = monsters[id].loot_table || [];

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
        lowTier.minDamage + (highTier.minDamage - lowTier.minDamage) * scalePercentage || 1,
        lowTier.maxDamage + (highTier.maxDamage - lowTier.maxDamage) * scalePercentage || 1
    );

    const monster = {
        level: level,
        name: tieredMonsterData.name || "Unknown",
        health: lowTier.health + (highTier.health - lowTier.health) * scalePercentage,
        expReward: lowTier.expReward + (highTier.expReward - lowTier.expReward) * scalePercentage || 0,
        attackSpeed: Math.max((lowTier.attackSpeed + (highTier.attackSpeed - lowTier.attackSpeed) * scalePercentage) || 20, 20),
        maxHealth: lowTier.health + (highTier.health - lowTier.health) * scalePercentage,
        evasion: lowTier.evasion + (highTier.evasion - lowTier.evasion) * scalePercentage || 1,
        damageRange: damageRange,
        idleTicks: 0,
        receiveDamage(amount: number) {
            if (amount < 0) {
                amount = 0;
            }

            this.health -= amount;

            if (this.health < 0) {
                this.health = 0;
            }

            return amount;
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
            const damage = this.damageRange.randomize();
            this.idleTicks -= this.attackSpeed;
            enemy.receiveDamage(damage);
            return damage;
        },
        resetIdleTicks() {
            this.idleTicks = 0;
        },
        generateLoot(): string[] {
            if (lootTable.length === 0) {
                return [];
            } else {
                const loot: string[] = [];
                const dropCount = Math.ceil(Math.random() * lootTable.length);
                for (let i = 0; i < dropCount; i++) {
                    loot.push(lootTable[Math.floor(Math.random() * lootTable.length)]);
                }
                return loot;
            }
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