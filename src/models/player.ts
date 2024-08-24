import Game, { LogSource } from "./game";
import { ICombatant } from "../interfaces/combatant";
import { EquipmentSlot } from "./equipment-slot";
import { EquipmentSlotType } from "./equipment-slot-type";
import { IWeapon } from "../interfaces/weapon";
import { Fists } from "./items/fists";

class Player implements ICombatant {
    readonly experienceLevels: bigint[] = [10n, 15n, 23n, 34n, 51n, 76n, 114n, 171n, 256n, 384n, 577n, 865n, 1297n, 1946n, 2919n, 4379n, 6568n, 9853n, 14779n, 22168n, 33253n, 49879n, 74818n, 112227n, 168341n, 252512n, 378768n, 568151n, 852227n, 1278340n, 1917511n, 2876266n, 4314399n, 6471598n, 9707397n, 14561096n, 21841644n, 32762466n, 49143699n, 73715549n, 110573323n, 165859985n, 248789977n, 373184966n, 559777449n, 839666173n, 1259499260n, 1889248890n, 2833873334n, 4250810001n, 6376215002n, 9564322503n, 14346483755n, 21519725632n, 32279588448n, 48419382673n, 72629074009n, 108943611013n, 163415416520n, 245123124780n, 367684687169n, 551527030754n, 827290546131n, 1240935819196n, 1861403728795n, 2792105593192n, 4188158389788n, 6282237584682n, 9423356377023n, 14135034565535n, 21202551848303n, 31803827772454n, 47705741658681n, 71558612488021n, 107337918732031n, 161006878098047n, 241510317147071n, 362265475720606n, 543398213580909n, 815097320371364n, 1222645980557050n, 1833968970835570n, 2750953456253350n, 4126430184380030n, 6189645276570040n, 9284467914855070n, 13926701872282600n, 20890052808423900n, 31335079212635800n, 47002618818953800n, 70503928228430700n, 105755892342646000n, 158633838513969000n, 237950757770953000n, 356926136656430000n, 535389204984645000n, 803083807476968000n, 1204625711215450000n, 1806938566823180000n];
    #idleTicks: number = 0;
    #experience: bigint = 0n;
    #level: number = 1;
    #game: Game;
    health: number = 10;
    maxHealth: number = 10;

    weaponSlot: EquipmentSlot<IWeapon> = new EquipmentSlot<IWeapon>(EquipmentSlotType.Weapon);

    get experience(): bigint {
        return this.#experience;
    }

    get level(): number {
        return this.#level;
    }

    get isAlive(): boolean {
        return this.health > 0;
    }

    constructor(game: Game) {
        this.#game = game;

        this.weaponSlot.item = new Fists();
    }
    
    get canAttack(): boolean {
        if (this.weaponSlot.item) {
            return this.weaponSlot.item.attackSpeed <= this.#idleTicks;
        }

        return this.#idleTicks >= 20; // Default attack speed
    }

    get idleTicks(): number {
        return this.#idleTicks;
    }

    addIdleTicks(): void {
        this.#idleTicks++;
    }

    attack(opponent: ICombatant): number {
        let damage = 1;
        let attackSpeed = 20;

        if (this.weaponSlot.item) {
            // Calculate the damage based on the weapon
            const weapon = this.weaponSlot.item as IWeapon;
            damage = Math.floor(Math.random() * (weapon.maxDamage - weapon.minDamage + 1)) + weapon.minDamage;
            attackSpeed = weapon.attackSpeed;
        }

        damage += this.#level;

        if (opponent.isAlive) {
            this.#idleTicks -= attackSpeed;
            return opponent.receiveDamage(damage);
        }

        return 0;
    }

    receiveDamage(amount: number): number {
        if (amount > this.health) {
            amount = this.health;
        }

        if (amount < 0) {
            amount = 0;
        }

        this.health -= amount;

        return amount;
    }

    gainExperience(amount: number) {
        this.#experience = this.#experience + BigInt(amount);

        // Check if we've leveled up
        while (this.#experience >= this.experienceLevels[this.#level - 1]) {
            this.#experience -= this.experienceLevels[this.#level - 1];
            this.#level++;

            this.#game.addLog(`You've reached level ${this.#level}!`, LogSource.Game);

            // Increase the player's health
            this.maxHealth += 2;

            // Heal the player to full health
            this.#game.addLog(`You've been healed to full health!`, LogSource.Game);
            this.health = this.maxHealth;
        }
    }
}

export { Player };
