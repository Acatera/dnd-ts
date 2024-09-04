import { Area } from "../models/area";

export class AreaFactory {
    static areaData: { [key: string]: any } | null = null;

    static async loadAreaData() {
        if (AreaFactory.areaData) {
            return AreaFactory.areaData;
        }

        const response = await fetch('data/area-data.json');
        AreaFactory.areaData = await response.json();

        return AreaFactory.areaData;
    }

    static createArea(id: string): Area {
        if (!AreaFactory.areaData || !AreaFactory.areaData[id]) {
            throw new Error(`Area with id ${id} not found`);
        }

        return new Area(AreaFactory.areaData[id]);
    }
}
