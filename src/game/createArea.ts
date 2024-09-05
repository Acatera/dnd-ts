import { Area } from "../types/Area";

let areas = {};

export async function loadAreaData() {
    const response = await fetch("data/area-data.json");
    const data = await response.json();
    areas = data;
}

export function createArea(id: string): Area {
    if (!areas[id]) {
        throw new Error(`Area with id ${id} not found`);
    }

    return {
        id,
        ...areas[id],
    };
}