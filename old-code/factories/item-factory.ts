import { Armor } from "../models/armor";
import { IArmor } from "../../src/types/Armor";
import { IWeapon } from "../../src/types/Weapon";
import { Weapon } from "../models/weapon";

export class ItemFactory {
    static itemData: { [key: string]: any } | null = null;

    static async loadItemData() {
        if (ItemFactory.itemData) {
            return ItemFactory.itemData;
        }

        const response = await fetch('data/item-data.json');
        ItemFactory.itemData = await response.json();

        return ItemFactory.itemData;
    }

    static getItemType(id: string): string {
        if (!ItemFactory.itemData || !ItemFactory.itemData[id]) {
            throw new Error(`Item data not found for ID: ${id}`);
        }

        return ItemFactory.itemData[id].type;
    }

    static createWeapon(id: string): IWeapon {
        if (!ItemFactory.itemData || !ItemFactory.itemData[id]) {
            throw new Error(`Weapon data not found for ID: ${id}`);
        }

        return new Weapon(id, ItemFactory.itemData[id]);
    }

    static createArmor(id: string): IArmor {
        if (!ItemFactory.itemData || !ItemFactory.itemData[id]) {
            throw new Error(`Armor data not found for ID: ${id}`);
        }

        return new Armor(id, ItemFactory.itemData[id]);
    }
}