/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

import Game from './game';

const game = new Game();

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    game.attack();
  }
});

game.start();