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

    const monster = {
        health: 10,
        maxHealth: 10,
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
        attack(enemy: Player) {
            const damage = 1;
            this.idleTicks -= this.attackSpeed;
            enemy.receiveDamage(damage);
            return damage;
        },
        resetIdleTicks() {
            this.idleTicks = 0;
        },
        attackSpeed: 20,
        evasion: 1,
        ...monsters[id],
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