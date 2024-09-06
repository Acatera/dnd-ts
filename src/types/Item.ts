export interface Item {
    id: string;
    name: string;
    description: string;
}

export let items: { [key: string]: any } = {};

export async function loadItemData() {
    const response = await fetch("data/item-data.json");
    const data = await response.json();
    items = data;
}

export function createItem(id: string): Item {
    if (!items[id]) {
        throw new Error(`Item with id ${id} not found`);
    }

    return {
        id,
        ...items[id],
    };
}

export function getItemName(id: string): string {
    if (!items[id]) {
        return `Unknown item (${id})`;
    }

    return items[id].name;
}