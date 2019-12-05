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
    posX += 1
    if (posX > 30) posX = 0
    instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
}

//KeyName,
//IAbstractTerminalGameIo
const keypressHandler = (instance: ITerminalGameIo, keyName: KeyName) => {
    process.exit(0)
    switch(keyName) {
        case Key.ArrowDown:
            posY = (posY + 1) % BOARD_HEIGHT;
            break;
        case 'a':
            posY = posY === 0 ? BOARD_HEIGHT - 1 : posY - 1;
            break;
        case Key.ArrowLeft:
            posX = posX === 0 ? BOARD_WIDTH - 1 : posX - 1;
            break;
        case Key.ArrowRight:
            posX = (posX + 1) % BOARD_WIDTH;
            break;
        case Key.Escape:
            instance.exit();
            break;
    }

    frameHandler(instance);
}

const startGame = () => {
    console.log(keypressHandler)
    setTimeout(() => {
        createTerminalGameIo({
            fps: 12,
            frameHandler,
            keypressHandler,
        })
    }, 3000)
}

export default startGame
