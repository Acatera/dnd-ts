import { Player } from "./Player";

let monsters: { [key: string]: any } = {};

export async function loadMonsterData() {
    const response = await fetch("data/monster-data.json");
    const data = await response.json();
    monsters = data;
}

export interface Monster {
    health: number;
    maxHealth: number;
    isAlive(): boolean;

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

export function createMonster(id: string): Monster {
    if (!monsters[id]) {
        throw new Error(`Monster with id ${id} not found`);
    }

    const lootTable = monsters[id].loot_table || [];

    const monster = {
        name: monsters[id].name || "Unknown",
        expReward: monsters[id].expReward || 0,
        health: monsters[id].health,
        maxHealth: monsters[id].health,
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
        idleTicks: 0,
        addIdleTicks() {
            this.idleTicks++;
        },
        canAttack() {
            return this.idleTicks >= this.attackSpeed;
        },
        attack(enemy: Player) {
            const damage = 1;
            this.idleTicks -= this.attackSpeed;
            enemy.receiveDamage(damage);
            return damage;
        },
        resetIdleTicks() {
            this.idleTicks = 0;
        },
        attackSpeed: Math.max(monsters[id].attackSpeed || 20, 20),
        evasion: monsters[id].evasion || 1,
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

    if (monster.attackSpeed === undefined) {
        monster.attackSpeed = 20;
    }

    return monster;
}

export function getMonsterName(id: string): string {
    const monster = monsters[id];
    if (!monster) {
        return "Unknown";
    }

    return monster.name;
}