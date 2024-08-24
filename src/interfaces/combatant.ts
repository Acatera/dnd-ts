export interface ICombatant {
    attack(enemy: ICombatant): number;
    receiveDamage(amount: number): number;
    canAttack: boolean;
    isAlive: boolean;
    idleTicks: number;
    addIdleTicks(): void;
}
