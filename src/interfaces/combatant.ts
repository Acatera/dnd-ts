export interface ICombatant {
    attack(enemy: ICombatant): number;
    gainExperience(amount: number): void;
    receiveDamage(amount: number): number;
    isAlive: boolean;
    health: number;
    maxHealth: number;
    name: string;
}