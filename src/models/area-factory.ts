import { Area } from "./area";
import { Mine } from "./areas/area-mine";

export class AreaFactory {
    static createArea(id: string): Area {
        switch (id) {
            case "mine":
                return new Mine();
            case "forest":
                return new Area(id, "Forest");
            case "mountain":
                return new Area(id, "Mountain");
            default:
                throw new Error(`Unknown area id: ${id}`);
        }
    }
}
