import { CriticalDamage } from "./CriticalDamage";
import { DamageRange } from "./DamageRange";

export interface DamageResult {
    amount: number;
    isCritical: boolean;
    isMiss: boolean;
}

export function calculateDamage(damageRange: DamageRange, criticalDamage: CriticalDamage): DamageResult {
    const damage = damageRange.randomize();
    
    return {
        amount: criticalDamage.roll() ? damage * criticalDamage.bonus : damage,
        isCritical: criticalDamage.roll(),
        isMiss: false
    };
}

export const noDamage: DamageResult = { amount: 0, isCritical: false, isMiss: false };
export const noDamageMiss: DamageResult = { amount: 0, isCritical: false, isMiss: true };