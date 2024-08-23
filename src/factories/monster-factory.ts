import { Monster } from "../models/monster";

export class MonsterFactory {
    static monsterData: { [key: string]: any } | null = null;

    static async loadMonsterData() {
        if (MonsterFactory.monsterData) {
            return MonsterFactory.monsterData;
        }

        const response = await fetch('data/monster-data.json');
        MonsterFactory.monsterData = await response.json();

        return MonsterFactory.monsterData; 
    }

    static createRandomMonster(): Monster {
        return new Monster('');
    }

    static createMonster(id: string): Monster {
        if (!MonsterFactory.monsterData || !MonsterFactory.monsterData[id]) {
            throw new Error(`Monster with id ${id} not found`);
        }

        return new Monster(MonsterFactory.monsterData[id]);
    }
}