# ReactGames

A collection of modular, interactive games built for React, designed to be easily integrated into your projects. This package currently includes games like: MineSweeper, Tetris & Snake.

## Features

- Modular design: Import only the games you need.
- React-based: Seamlessly integrates into React projects.
- Extensible: Customize game logic and components to suit your needs.

## Installation

To include reactgames in your project, add it to your dependencies:

```sh
"dependencies": {
  "reactgames": "https://github.com/johnruane/reactgames.git"
}
```

Run npm install afterward to fetch the package.

## Shared Resources

A number of games share the same Components, Utils & Styles. These are in the 'shared' directory. To copy/update these resources into the game directory run:

```sh
npm run build
```

## Usage

Each game is modular and can be imported individually. Here's an example of how to use the MineSweeper game:

```sh
import { MineSweeper as MinesweeperGame } from 'reactgames/MineSweeper/minesweeper';

```
