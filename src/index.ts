/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import Game from './game';

// Define enum for source of log messages
export enum LogSource {
  Game,
  Player,
  Enemy,
  Item,
  Environment,
}

function addLog(message: string, source: LogSource = LogSource.Game) {
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
  }
}

addLog("Welcome to RoguePunk!");
addLog("You are a rogue in a cyberpunk world.");
addLog("You strike Cyberdemon for 3 damage.", LogSource.Player);
addLog("Cyberdemon strikes you for 1 damage.", LogSource.Enemy);
addLog("The sword glows with a faint light.", LogSource.Item);
const game = new Game();