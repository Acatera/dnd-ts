export interface TieredMonsterDefinition {
    name: string;
    tiers: { [key: string]: MonsterTier };
}

export interface MonsterTier {
    health: number;
    expReward: number;
    attackSpeed: number;
    evasion: number;
    minDamage: number;
    maxDamage: number;
}
