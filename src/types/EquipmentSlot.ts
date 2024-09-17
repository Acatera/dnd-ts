import { EquippableComponent } from "./components/EquippableComponent";
import { EquipmentSlotType } from "./EquipmentSlotType";
import { ItemManager } from "./ItemManager";

export interface EquipmentSlot {
    itemId: string | null;
    slot: EquipmentSlotType;
}

export function createEquipmentSlot(slotType: EquipmentSlotType, itemId?: string): EquipmentSlot {
    const slot = {
        itemId: itemId || null,
        slot: slotType
    };

    if (itemId) {
        const item = ItemManager.getItem(itemId);
        if (!item) {
            throw new Error(`Item with id ${itemId} not found`);
        }

        const slotType = item.getComponent<EquippableComponent>("EquippableComponent")?.slot;
        if (slotType !== slot.slot) {
            throw new Error(`Item with id ${itemId} cannot be equipped in slot ${slot.slot}`);
        }
    }
    
    return slot;
}