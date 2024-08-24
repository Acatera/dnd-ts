import { IItem } from "../interfaces/item";

export class Item implements IItem {
    id: string;
    name: string;
    description: string;

    constructor(id: string, data: { [key: string]: any }) {
        this.id = id;
        this.name = data.name;
        this.description = data.description;
    }
}