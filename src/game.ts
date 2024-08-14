import { Player } from "./player";

export class Game {
    #player: Player;

    constructor() {
        this.#player = new Player(this);
    }

    start() {
        this.addLog("Welcome to RoguePunk!");
        this.addLog("You are a rogue in a cyberpunk world.");
        this.#player.attack();
    }

    attack() {
        this.#player.attack();

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
}

export enum LogSource {
    Game,
    Player,
    Enemy,
    Item,
    Environment,
}

export default Game;