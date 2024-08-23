/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import { MonsterFactory } from './factories/monster-factory';
import Game from './models/game';

const game = new Game();

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    game.attack();
  }
});

const attackControl = document.getElementById('attack-control');

if (attackControl) {
  attackControl.addEventListener('click', function() {
    game.attack();
  });
}
await game.start();