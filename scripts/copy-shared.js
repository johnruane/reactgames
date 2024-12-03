const path = require('path');
const fse = require('fs-extra');

/*
 * Update gameDirectories to include further games that required the shared directory
 */
const gameDirectories = ['Tetris', 'Snake', 'Minesweeper'];
const sharedDirectory = path.resolve(__dirname, '..', 'shared');

async function copyShared() {
  try {
    for (gameDir of gameDirectories) {
      const destination = path.resolve(__dirname, '..', 'games', gameDir, 'shared');
      await fse.copy(sharedDirectory, destination);
      console.log(`Copied shared to /games/${gameDir}`);
    }
    console.log('Shared folder copied to all apps successfully.');
  } catch (error) {
    console.error('Error copying shared folder:', error);
  }
}

copyShared();
