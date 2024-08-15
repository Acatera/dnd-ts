import { Combat } from "./combat";
import { ICombatant } from "./interfaces/combatant";
import { Monster } from "./monster";
import { Player } from "./player";

export class Game {
    #player: Player;
    #combat: Combat | null = null;

    constructor() {
        this.#player = new Player(this);
    }

    start() {
        this.addLog("Welcome to RoguePunk!");
        this.addLog("You are a rogue in a cyberpunk world.");
    }

    attack() {
        if (!this.#combat) {
            this.#combat = this.createCombat();
        }

        this.#combat.playerAttack();

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
            charInfo.innerHTML = `Experience: ${this.#player.experience}`;
        }
    }

    createCombat() {
        const enemy = this.#createEnemy();
        return new Combat(this.#player, enemy);
    }

    #createEnemy(): ICombatant {
        return Monster.createRandomMonster(this);
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