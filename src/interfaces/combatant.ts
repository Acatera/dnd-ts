export interface ICombatant {
    attack(enemy: ICombatant): number;
    receiveDamage(amount: number): number;
    canAttack: boolean;
    isAlive: boolean;
    idleTicks: number;
    evasion: number;
    addIdleTicks(): void;
    resetIdleTicks(): void;
    attackSpeed: number;
}
