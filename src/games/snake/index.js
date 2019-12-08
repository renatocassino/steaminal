import game from '../../engine';

let FPS = 2;
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

let counter = 0;

const getKey = (x, y) => `${x}x${y}`;
let direction = Direction.Right;
let nextDirection = Direction.Right;

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
  const x = getBetween(1, BOARD_WIDTH - 1);
  const y = getBetween(1, BOARD_HEIGHT - 1);
  const positionFood = getKey(x, y);
  foodPosition = positionFood;
};

const move = () => {
  if (nextDirection !== direction) {
    direction = nextDirection;
  }

  switch (direction) {
    case Direction.Up:
      posY -= 1;
      if (posY < 1) posY = BOARD_HEIGHT - 2;
      break;
    case Direction.Down:
      posY += 1;
      if (posY >= BOARD_HEIGHT - 1) posY = 1;
      break;
    case Direction.Left:
      posX -= 1;
      if (posX < 1) posX = BOARD_WIDTH - 2;
      break;
    case Direction.Right:
      posX += 1;
      if (posX >= BOARD_WIDTH - 1) posX = 1;
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
    counter += 1;
    if (counter === 2) {
      counter = 0;
      FPS++;
      game.setFPS(FPS);
    }
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
      if (y === 0 || y === BOARD_HEIGHT - 1 || x === 0 || x === BOARD_WIDTH - 1) {
        frameData += '#';
        continue;
      }

      const currentPosition = `${x}x${y}`;
      if (snake[currentPosition]) {
        frameData += 'o';
        continue;
      }

      if (foodPosition === currentPosition) {
        frameData += 'Φ';
        continue;
      }

      frameData += ' ';
    }
  }

  move();
  instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
};

const keypressHandler = (instance, keyName) => {
  switch (keyName) {
    case 's':
      if (direction !== Direction.Up) nextDirection = Direction.Down;
      break;
    case 'w':
      if (direction !== Direction.Down) nextDirection = Direction.Up;
      break;
    case 'a':
      if (direction !== Direction.Right) nextDirection = Direction.Left;
      break;
    case 'd':
      if (direction !== Direction.Left) nextDirection = Direction.Right;
      break;
    case 'q':
      instance.exit();
      break;
    default:
      break;
  }
};

setFoodPosition();

export default {
  title: 'Snake',
  description: 'Classic Snake game with WASD commands',
  gameData: {
    fps: FPS,
    frameHandler,
    keypressHandler,
  },
};
