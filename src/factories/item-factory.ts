import { IWeapon } from "../interfaces/weapon";
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

    static createWeapon(id: string): IWeapon {

        if (!ItemFactory.itemData || !ItemFactory.itemData[id]) {
            throw new Error(`Weapon data not found for ID: ${id}`);
        }

        return new Weapon(id, ItemFactory.itemData[id]);
    }
}