import { BonusesComponent } from "./components/BonusesComponent";
import { Component, ComponentType } from "./components/Component";
import { DamageComponent } from "./components/DamageComponent";
import { DefenseComponent } from "./components/DefenseComponent";
import { EquippableComponent } from "./components/EquippableComponent";
import { Item } from "./Item";

export class ItemManager {
    private static items: Map<string, Item> = new Map<string, Item>();
    private static rawItemData: { [key: string]: any } = {};

    static componentClasses: { [key: string]: any } = {
        EquippableComponent,
        DamageComponent,
        DefenseComponent,
        BonusesComponent
    };

    static async loadItemData() {
        const response = await fetch("data/item-data.json");
        const data = await response.json();
        this.rawItemData = data;

        for (const id in data) {
            this.createItem(id);
        }
    }

    static addItem(item: Item) {
        this.items.set(item.id, item);
    }

    static getItem(id: string): Item | null {
        if (!this.items.has(id)) {
            const rawItem = this.rawItemData[id];
            if (!rawItem) {
                return null;
            }

            const item = new Item(id, rawItem.name, rawItem.description);
            this.items.set(id, item);
        }

        return this.items.get(id) || null;
    }

    private static createItem(id: string): Item {
        const rawItem = this.rawItemData[id];
        if (!rawItem) {
            throw new Error(`Item with id ${id} not found.`);
        }

        const item = new Item(id, rawItem.name, rawItem.description);
        this.items.set(id, item);

        if (!rawItem.components) {
            return item;
        }

        for (const [componentName, componentData] of Object.entries(rawItem.components)) {
            const componentType: ComponentType | null = componentName as ComponentType;

            if (!componentType) {
                console.warn(`Unknown component type: ${componentName}`);
                continue;
            }

            const componentClass = this.componentClasses[componentName];
            if (componentClass) {
                const component = new componentClass(...Object.values(componentData as { [key: string]: any }));
                item.addComponent(componentType, component);
            } else {
                console.warn(`Unknown component: ${componentName}`);
            }
        }

        return item;
    }
}

export type ItemType = "Unknown" | "Weapon" | "Armor" | "Consumable" | "Misc";
