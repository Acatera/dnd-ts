export interface ICombatant {
    attack(): void;
    gainExperience(amount: number): void;
}