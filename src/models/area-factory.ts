import { Area } from "./area";

export class AreaFactory {
    static createArea(id: string): Area {
        switch (id) {
            case "mine":
                return new Area(id, "Mine");
            case "forest":
                return new Area(id, "Forest");
            case "mountain":
                return new Area(id, "Mountain");
            default:
                throw new Error(`Unknown area id: ${id}`);
        }
    }
}