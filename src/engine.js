import {
  createTerminalGameIo,
} from 'terminal-game-io';

const BOARD_WIDTH = 80;
const BOARD_HEIGHT = 30;

const noOp = () => {};

const game = createTerminalGameIo({
  fps: 1,
  frameHandler: noOp,
  keypressHandler: noOp,
});

const resetInterval = function () {
  clearInterval(this.intervalId);
  game.intervalId = setInterval(() => game.frameHandler(game), game.frameDuration);
};

const setKeyPressHandler = function (keyPressHandler) {
  this.keypressHandler = keyPressHandler.bind(this);
};

const setFrameHandler = function (frameHandler) {
  this.frameHandler = frameHandler.bind(this);
  this.resetInterval();
};

const setFPS = function (fps) {
  this.frameDuration = Math.round(1000 / fps);
  this.resetInterval();
};


game.setFPS = setFPS.bind(game);
game.resetInterval = resetInterval.bind(game);
game.setFrameHandler = setFrameHandler.bind(game);
game.setKeyPressHandler = setKeyPressHandler.bind(game);

export default game;
