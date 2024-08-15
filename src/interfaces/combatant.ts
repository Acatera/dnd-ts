export interface ICombatant {
    attack(enemy: ICombatant): void;
    gainExperience(amount: number): void;
    receiveDamage(amount: number): void;
    isAlive: boolean;
}