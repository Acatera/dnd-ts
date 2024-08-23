export interface ICombatant {
    attack(enemy: ICombatant): number;
    receiveDamage(amount: number): number;
    isAlive: boolean;
}
