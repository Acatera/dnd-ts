/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import Game from './game';

function addLog(message: string) {
  const logElement = document.getElementById('logs');
  if (logElement) {
    logElement.innerHTML += message + '<br>';
  }
}

addLog("Welcome to RoguePunk!");
addLog("You are a rogue in a cyberpunk world.");
addLog("You are in a dark alley.");
const game = new Game();