import { IItem } from "../interfaces/item";

export class Item implements IItem {
    id: string;
    name: string;
    description: string;

    constructor(data: { [key: string]: any }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }
}