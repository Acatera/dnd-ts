import { Monster } from "../models/monster";

export class MonsterFactory {
    static monsterData: { [key: string]: TieredMonsterDefinition | MonsterDefinition } | null = null;

    static async loadMonsterData() {
        if (MonsterFactory.monsterData) {
            return MonsterFactory.monsterData;
        }

        const response = await fetch('data/monster-data.json');
        MonsterFactory.monsterData = await response.json();

        return MonsterFactory.monsterData;
    }

    static createRandomMonster(): Monster {
        if (!MonsterFactory.monsterData) {
            throw new Error('Monster data not loaded');
        }

        const monsterIds = Object.keys(MonsterFactory.monsterData);
        const randIndex = Math.floor(Math.random() * monsterIds.length);
        const randMonsterId = monsterIds[randIndex];

        return new Monster(MonsterFactory.monsterData[randMonsterId]);
    }

    static createMonster(id: string): Monster {
        if (!MonsterFactory.monsterData || !MonsterFactory.monsterData[id]) {
            throw new Error(`Monster with id ${id} not found`);
        }

        return new Monster(MonsterFactory.monsterData[id]);
    }

    static createScaledMonster(id: string, scale: number): Monster {
        if (!MonsterFactory.monsterData || !MonsterFactory.monsterData[id]) {
            throw new Error(`Monster with id ${id} not found`);
        }

        const monsterData = MonsterFactory.monsterData[id];
        // Check if the monster implements the TieredMonsterDefinition interface
        if (monsterData.hasOwnProperty('tiers')) {
            const tieredMonsterData = monsterData as TieredMonsterDefinition;
            
            const tierKeys = Object.keys(tieredMonsterData.tiers).sort((a, b) => parseInt(a) - parseInt(b));
            // Find the highest tier that is less than or equal to the scale
            const lowTierKey = tierKeys.filter(key => parseInt(key) <= scale).pop();
            if (!lowTierKey) {
                throw new Error(`No low tier found for scale ${scale}`);
            }
            // Find the lowest tier that is greater than the scale
            const highTierKey = tierKeys.filter(key => parseInt(key) >= scale).shift();
            if (!highTierKey) {
                throw new Error(`No high tier found for scale ${scale}`);
            }

            console.log(`lowTierKey: ${lowTierKey}`);
            console.log(`highTierKey: ${highTierKey}`);

            // Calculate the percentage of the way between the low and high tiers
            const lowTier = tieredMonsterData.tiers[lowTierKey];
            const highTier = tieredMonsterData.tiers[highTierKey];
            const lowTierScale = parseInt(lowTierKey);
            const highTierScale = parseInt(highTierKey);
            let scalePercentage = (scale - lowTierScale) / (highTierScale - lowTierScale);
            
            if (isNaN(scalePercentage)) {
                scalePercentage = 0;
            }

            // Interpolate the values between the low and high tiers
            const interpolatedMonsterData = {
                name: tieredMonsterData.name,
                health: lowTier.health + (highTier.health - lowTier.health) * scalePercentage,
                expReward: lowTier.expReward + (highTier.expReward - lowTier.expReward) * scalePercentage,
                attackSpeed: lowTier.attackSpeed + (highTier.attackSpeed - lowTier.attackSpeed) * scalePercentage,
                evasion: lowTier.evasion + (highTier.evasion - lowTier.evasion) * scalePercentage
            };

            debugger;

            return new Monster(interpolatedMonsterData);
        }


        return this.createMonster(id);
    }

    static getMonsterName(id: string): string {
        if (!MonsterFactory.monsterData || !MonsterFactory.monsterData[id]) {
            throw new Error(`Monster with id ${id} not found`);
        }

        return MonsterFactory.monsterData[id].name;
    }
}

interface MonsterTier {
    health: number;
    expReward: number;
    attackSpeed: number;
    evasion: number;
}

interface TieredMonsterDefinition {
    name: string;
    tiers: { [key: string]: MonsterTier };
}

interface MonsterDefinition {
    name: string;
    health: number;
    expReward: number;
    attackSpeed: number;
    evasion: number;
}