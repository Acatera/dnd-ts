import Game, { LogSource } from "./game";
import { Combatant } from "../../types/Combatant";
import { EquipmentSlot } from "./equipment-slot";
import { EquipmentSlotType } from "./equipment-slot-type";
import { IWeapon } from "../interfaces/weapon";
import { Fists } from "./items/fists";
import { IArmor } from "../interfaces/armor";
import { SkillType } from "../../types/SkillType";
import { PlayerSkills } from "./player-skills";
import { IItemRequirements } from "../interfaces/item-requirements";
import { ItemStack } from "./item-stack";

export class Player implements Combatant {
    readonly experienceLevels: bigint[] = [10n, 15n, 23n, 34n, 51n, 76n, 114n, 171n, 256n, 384n, 577n, 865n, 1297n, 1946n, 2919n, 4379n, 6568n, 9853n, 14779n, 22168n, 33253n, 49879n, 74818n, 112227n, 168341n, 252512n, 378768n, 568151n, 852227n, 1278340n, 1917511n, 2876266n, 4314399n, 6471598n, 9707397n, 14561096n, 21841644n, 32762466n, 49143699n, 73715549n, 110573323n, 165859985n, 248789977n, 373184966n, 559777449n, 839666173n, 1259499260n, 1889248890n, 2833873334n, 4250810001n, 6376215002n, 9564322503n, 14346483755n, 21519725632n, 32279588448n, 48419382673n, 72629074009n, 108943611013n, 163415416520n, 245123124780n, 367684687169n, 551527030754n, 827290546131n, 1240935819196n, 1861403728795n, 2792105593192n, 4188158389788n, 6282237584682n, 9423356377023n, 14135034565535n, 21202551848303n, 31803827772454n, 47705741658681n, 71558612488021n, 107337918732031n, 161006878098047n, 241510317147071n, 362265475720606n, 543398213580909n, 815097320371364n, 1222645980557050n, 1833968970835570n, 2750953456253350n, 4126430184380030n, 6189645276570040n, 9284467914855070n, 13926701872282600n, 20890052808423900n, 31335079212635800n, 47002618818953800n, 70503928228430700n, 105755892342646000n, 158633838513969000n, 237950757770953000n, 356926136656430000n, 535389204984645000n, 803083807476968000n, 1204625711215450000n, 1806938566823180000n];
    #idleTicks: number = 0;
    #experience: bigint = 0n;
    #level: number = 1;
    #game: Game;
    health: number = 10;

    get maxHealth(): number {
        return this.#skills[SkillType.MaxHealth];
    }

    weaponSlot: EquipmentSlot<IWeapon> = new EquipmentSlot<IWeapon>(EquipmentSlotType.Weapon);
    armorSlots: EquipmentSlot<IArmor>[] = [
        new EquipmentSlot<IArmor>(EquipmentSlotType.Head),
        new EquipmentSlot<IArmor>(EquipmentSlotType.Chest),
        new EquipmentSlot<IArmor>(EquipmentSlotType.Legs),
        new EquipmentSlot<IArmor>(EquipmentSlotType.Feet),
        new EquipmentSlot<IArmor>(EquipmentSlotType.Hands)
    ];
    inventory: ItemStack[] = [];
    #skills: PlayerSkills = {
        // Abilities
        [SkillType.Strength]: 1,
        [SkillType.Stamina]: 1,
        [SkillType.Agility]: 1,
        [SkillType.Intelligence]: 1,

        // General skills
        [SkillType.MaxHealth]: 10,
        [SkillType.Evades]: 1,
        [SkillType.Initiative]: 1,

        // Ranged skills
        [SkillType.Bow]: 1,
        [SkillType.Pistol]: 1,
        [SkillType.SMG]: 1,
        [SkillType.Rifle]: 1,
        [SkillType.Shotgun]: 1,
        [SkillType.Heavy]: 1,
        [SkillType.Energy]: 1,
        [SkillType.Explosive]: 1,
        [SkillType.Thrown]: 1,

    };

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
        return this.#idleTicks >= this.attackSpeed;
    }

    get idleTicks(): number {
        return this.#idleTicks;
    }

    get evasion(): number {
        return this.#skills[SkillType.Evades];
    }

    get attackSpeed(): number {
        let attackSpeed = 0;

        if (this.weaponSlot.item) {
            attackSpeed = this.weaponSlot.item.attackSpeed
        }

        // Add initiative bonus: for every 10 points of initiative, reduce attack speed by 1/20th of a second
        attackSpeed -= this.#skills[SkillType.Initiative] / 10;

        return Math.max(attackSpeed, 20);   
    }

    addIdleTicks(): void {
        this.#idleTicks++;
    }

    resetIdleTicks(): void {
        this.#idleTicks = 0;
    }

    getSkill(skill: SkillType): number {
        const skillBonuses = this.#getSkillBonuses(skill);
        return this.#skills[skill] + skillBonuses;
    }

    #getSkillBonuses(skill: SkillType): number {
        let totalBonus = 0;

        for (let armorSlot of this.armorSlots) {
            if (armorSlot.item) {
                totalBonus += armorSlot.item.bonuses[skill] || 0;
            }
        }

        return totalBonus;
    }

    getAttackRating(): number {
        let attackRating = 1; // TODO: replace this with unarmed attack rating
        if (this.weaponSlot.item) {
            const primarySkill = this.weaponSlot.item.getPrimarySkill();
            attackRating = this.getSkill(primarySkill);
        }
        return attackRating;
    }

    attack(opponent: Combatant): number {
        if (!opponent.isAlive) {
            this.#idleTicks = 0;
            return 0;
        }

        let damage = 1;
        const attackRating = this.getAttackRating();
        const defenseRating = opponent.evasion <= 0 ? 1 : opponent.evasion;
        const hitCoefficient = 25;
        const hitChance = (attackRating + hitCoefficient) / (attackRating + defenseRating + hitCoefficient);

        console.log(`Player hit chance: ${hitChance}`);

        if (this.weaponSlot.item) {
            const minDamage = this.weaponSlot.item.minDamage * (1 + attackRating / 400);
            const maxDamage = this.weaponSlot.item.maxDamage * (1 + attackRating / 400);
            damage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage);
        }

        if (Math.random() > hitChance) {
            this.#idleTicks -= this.attackSpeed;
            return -1;
        }

        this.#idleTicks -= this.attackSpeed;
        return opponent.receiveDamage(damage);
    }

    receiveDamage(amount: number): number {
        const totalArmor = this.#totalDefence();
        const damage = amount - totalArmor;

        if (damage < 0) {
            return 0;
        }


        if (damage > this.health) {
            this.health = 0;
            return this.health;
        }

        this.health -= damage;

        return damage;
    }

    gainExperience(amount: number) {
        this.#experience = this.#experience + BigInt(amount);

        // Check if we've leveled up
        while (this.#experience >= this.experienceLevels[this.#level - 1]) {
            this.#experience -= this.experienceLevels[this.#level - 1];
            this.#level++;

            this.#game.addLog(`You've reached level ${this.#level}!`, LogSource.Game);

            // Increase the player's health
            this.#skills.MaxHealth += 1;

            // Increase the player's skills
            for (const skill in this.#skills) {
                this.#skills[skill as SkillType]++;
            }

            // Heal the player to full health
            this.#game.addLog(`You've been healed to full health!`, LogSource.Game);
            this.health = this.maxHealth;
        }
    }


    meetsRequirements(requirements: IItemRequirements): boolean {
        if (!requirements) {
            return true;
        }

        return Object.entries(requirements).every(([skill, level]) => {
            const skillType = skill as SkillType;
            return this.#skills[skillType] >= level;
        });
    }

    wieldWeapon(weapon: IWeapon): boolean {
        // Weapon can be wielded if the player meets the requirements and the slot is correct
        if (this.meetsRequirements(weapon.requirements) && this.weaponSlot.slot === weapon.slot) {
            this.weaponSlot.item = weapon;
            return true;
        }

        return false;
    }

    equipArmor(armor: IArmor): boolean {
        // Armor can be equipped if the player meets the requirements and the slot is correct
        const armorSlot = this.armorSlots.find(slot => slot.slot === armor.slot);
        if (armorSlot && this.meetsRequirements(armor.requirements)) {
            armorSlot.item = armor;
            return true;
        }

        return false;
    }

    #totalDefence(): number {
        let totalArmor = 0;

        for (let armorSlot of this.armorSlots) {
            if (armorSlot.item) {
                totalArmor += armorSlot.item.defense;
            }
        }

        return totalArmor;
    }
}