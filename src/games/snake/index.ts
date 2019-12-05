import {
    createTerminalGameIo,
    ITerminalGameIoOptions,
    ITerminalGameIo,
    Key,
    KeyName,
//    IAbstractTerminalGameIo,
} from 'terminal-game-io'

const FPS = 1;
const BOARD_WIDTH = 40;
const BOARD_HEIGHT = 12;

let terminalGameIo;
let posX = Math.round(BOARD_WIDTH / 2);
let posY = Math.round(BOARD_HEIGHT / 2);

const frameHandler = (instance: ITerminalGameIo) => {
    let frameData = '';

    for (let y = 0; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
            frameData += (posX === x && posY === y) ? '@' : '.';
        }
    }
    instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
}

const keypressHandler = (instance: ITerminalGameIo, keyName: KeyName) => {
    switch(keyName) {
        case 's':
            posY = (posY + 1) % BOARD_HEIGHT;
            break;
        case 'w':
            posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
            break;
        case 'a':
            posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
            break;
        case 'd':
            posX = (posX + 1) % BOARD_WIDTH;
            break;
        case 'q':
            instance.exit();
            break;
    }

    frameHandler(instance);
}

const startGame = () => {
  createTerminalGameIo({
      fps: FPS,
      frameHandler,
      keypressHandler,
  })
}

export default startGame
