import {
  createTerminalGameIo,
} from 'terminal-game-io';

const FPS = 4;
const BOARD_WIDTH = 60;
const BOARD_HEIGHT = 20;

let isLooser = false;
let terminalGameIo;
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);

const Direction = {
  Up: 1,
  Down: 2,
  Left: 3,
  Right: 4,
};

const getKey = (x, y) => `${x}x${y}`;
let direction = Direction.Right;

const keys = [
  getKey(posX - 2, posY),
  getKey(posX - 1, posY),
  getKey(posX, posY),
];

const snake = {
  [getKey(posX - 2, posY)]: true,
  [getKey(posX - 1, posY)]: true,
  [getKey(posX, posY)]: true,
};

let foodPosition = '';

const getBetween = (min, max) => (
  Math.floor(Math.random() * max) + min
);

const setFoodPosition = () => {
  const x = getBetween(0, BOARD_WIDTH);
  const y = getBetween(0, BOARD_HEIGHT);
  const positionFood = getKey(x, y);
  foodPosition = positionFood;
};

const move = () => {
  switch (direction) {
    case Direction.Up:
      posY -= 1;
      if (posY < 0) posY = BOARD_HEIGHT - 1;
      break;
    case Direction.Down:
      posY += 1;
      if (posY >= BOARD_HEIGHT) posY = 0;
      break;
    case Direction.Left:
      posX -= 1;
      if (posX < 0) posX = BOARD_WIDTH - 1;
      break;
    case Direction.Right:
      posX += 1;
      if (posX >= BOARD_WIDTH) posX = 0;
      break;
    default:
      break;
  }

  const key = getKey(posX, posY);
  if (snake[key]) {
    isLooser = true;
    return;
  }

  snake[key] = true;
  keys.push(key);

  if (foodPosition === key) {
    setFoodPosition();
    return;
  }

  const keyToDelete = keys.shift() || '';
  if (snake[keyToDelete]) {
    snake[keyToDelete] = false;
  }
};

const frameHandler = (instance) => {
  let frameData = '';

  if (isLooser) {
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        frameData += '#';
      }
    }

    const message = 'You loose. Press Q to Quit. ';
    frameData = `${message}${frameData.slice(message.length)}`;
    instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
    return;
  }

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const currentPosition = `${x}x${y}`;
      if (snake[currentPosition]) {
        frameData += '@';
        continue;
      }

      if (foodPosition === currentPosition) {
        frameData += 'Φ';
        continue;
      }

      frameData += '.';
    }
  }

  move();
  instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
};

const keypressHandler = (instance, keyName) => {
  switch (keyName) {
    case 's':
      if (direction !== Direction.Up) direction = Direction.Down;
      break;
    case 'w':
      if (direction !== Direction.Down) direction = Direction.Up;
      break;
    case 'a':
      if (direction !== Direction.Right) direction = Direction.Left;
      break;
    case 'd':
      if (direction !== Direction.Left) direction = Direction.Right;
      break;
    case 'q':
      terminalGameIo.exit();
      break;
    default:
      break;
  }
};

const startGame = () => {
  setFoodPosition();
  terminalGameIo = createTerminalGameIo({
    fps: FPS,
    frameHandler,
    keypressHandler,
  });
};

const game = {
    startGame,
    title: 'Snake',
    description: 'Classic Snake game with WASD commands',
};

export default game;
