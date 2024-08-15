import { Combat } from "./combat";
import { ICombatant } from "../interfaces/combatant";
import { Monster } from "./monster";
import { Player } from "./player";

export class Game {
    #player: Player;

    constructor() {
        this.#player = new Player(this);
    }

    start() {
        this.addLog("Welcome to RoguePunk!");
        this.addLog("You are a rogue in a cyberpunk world.");
    }

    attack() {
        const combat = this.createCombat();
        const result = combat.simulate();

        if (result.enemy.isAlive) {
            this.addLog("You've been defeated!", LogSource.Game);
        } else {
            this.addLog(`You've defeated the ${result.enemy.name}!`, LogSource.Game);
        }

        this.updatePlayerInfoPanel();
    }

    addLog(message: string, source: LogSource = LogSource.Game) {
        const logElement = document.getElementById('logs');
        if (logElement) {
            const line = document.createElement('p');
            if (source === LogSource.Game) {
                line.style.color = 'darkgrey';
            }

            if (source === LogSource.Player) {
                line.style.color = 'lightgreen';
            }

            if (source === LogSource.Enemy) {
                line.style.color = 'lightcoral';
            }

            if (source === LogSource.Item) {
                line.style.color = 'lightblue';
            }

            line.classList.add('log-line');
            line.textContent = message;
            logElement.appendChild(line);

            // Scroll to the bottom of the log
            logElement.scrollTop = logElement.scrollHeight;

            if (logElement.children.length > 100) {
                logElement.removeChild(logElement.children[0]);
            }
        }
    }

    updatePlayerInfoPanel() {
        const charInfo = document.getElementById('char-info');
        if (charInfo) {
            // Update the player's health as a bar
            let healthElement = document.getElementById('char-health-current') as HTMLDivElement | null;

            if (healthElement) {
                healthElement.style.width = `${(this.#player.health / this.#player.maxHealth) * 100}%`;
            }

            // Update the player's experience as a bar
            let experienceElement = document.getElementById('char-experience-current') as HTMLDivElement | null;

            if (experienceElement) {
                experienceElement.style.width = `${(Number(this.#player.experience) / Number(this.#player.experienceLevels[this.#player.level - 1])) * 100}%`;
            }

            // Update the player's level
            let levelElement = document.getElementById('char-level') as HTMLParagraphElement | null;

            if (!levelElement) {
                levelElement = document.createElement('p');
                levelElement.id = 'char-level';
                levelElement.classList.add('char-info-line');
                charInfo.appendChild(levelElement);
            }

            levelElement.innerHTML = `Level: ${this.#player.level}`;
        }
    }

    createCombat() {
        const enemy = this.#createEnemy();
        const combat = new Combat(this.#player, enemy);
        combat.onTurn = (result) => {
            if (result.attackerDamage > 0) {
                this.addLog(`You attack ${result.defender.name} for ${result.attackerDamage} damage with your ${this.#player.weaponSlot.item?.name}.`, LogSource.Player);
            }

            if (result.defenderDamage > 0) {
                this.addLog(`${result.defender.name} attacks you for ${result.defenderDamage} damage.`, LogSource.Enemy);
            }
        }

        return combat;
    }

    #createEnemy(): ICombatant {
        return Monster.createRandomMonster();
    }
}

export enum LogSource {
    Game,
    Player,
    Enemy,
    Item,
    Environment,
}

export default Game;