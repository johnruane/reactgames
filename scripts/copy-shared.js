const path = require('path');
const fse = require('fs-extra');

/*
 * Update gameDirectories to include further games that required the shared directory
 */
const gameDirectories = ['Tetris', 'Snake', 'Minesweeper', 'Mastermind'];
const sharedDirectory = path.resolve(__dirname, '..', 'shared');

async function copyShared() {
  try {
    for (let gameDir of gameDirectories) {
      const destination = path.resolve(__dirname, '..', 'games', gameDir, 'shared');

      // Copy shared directory while excluding .test files
      await fse.copy(sharedDirectory, destination, {
        filter: (src) => {
          // Exclude files that match .test.js or .test.ts patterns
          return !/\.test\.(js|ts)$/.test(src);
        },
      });

      console.log(`Copied shared to /games/${gameDir}`);
    }
    console.log('Shared folder copied to all apps successfully.');
  } catch (error) {
    console.error('Error copying shared folder:', error);
  }
}

copyShared();
