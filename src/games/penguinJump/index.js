import { Key } from 'terminal-game-io';

const FPS = 8;

const BOARD_WIDTH = 140;
const BOARD_HEIGHT = 15;
const JUMP_SIZE = 4;
const VELOCITY = 4;

const getWidthOfDraw = draw => draw.split('\n').map(l => l.length).sort((a, b) => b < a ? -1 : 1).shift();
const getHeightOfDraw = draw => draw.split('\n').length - 1;

const penguin = `
 __
( o>
///\\
\\V_/_`;

const cloud = `
      _ .
   (  _ )_
 (_  _(_ ,)
`;

const cloud2 = `
     .--
  .+(   )
  (   .  )
 (   (   ))
  \`- __.'`;

const igloo = `
    .-'''''-.
  .'_ / _ \ _'.____
 / _/ _ | _ \_ \ _.'.
/_/___/___\___\_\_|_|`;

let iglooX = BOARD_WIDTH;
let penguinY = BOARD_HEIGHT - getHeightOfDraw(penguin);
let jump = 0;
let jumping = false;

const addDrawToBoard = (draw, board, x = 0, y = 0) => {
    const drawLines = draw.split('\n').slice(1);

    board = board.split('');

    let currentY = y;
    for (let i = 0; i < drawLines.length; i++) {
        const line = drawLines[i];
        const position = currentY * BOARD_WIDTH + x;
        for (let j = 0; j < line.length; j++) {
            const currentPosition = position + j;
            if (currentY !== Math.trunc((currentPosition) / BOARD_WIDTH)) continue;
            if (!board[currentPosition]) continue;
            board[position + j] = line[j];
        }
        currentY++;
    }

    return board.join('');
}

const frameHandler = (instance) => {
    if (jumping) {
        penguinY = Math.round(jump + penguinY);
        jump += 1;

        if (penguinY >= 11) {
            penguinY = 11;
            jump = 0;
            jumping = false;
        }
    }

    let frameData = '';
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        if (y === BOARD_HEIGHT - 1) {
            frameData += '_'.repeat(BOARD_WIDTH);
            continue;
        }

        for (let x = 0; x < BOARD_WIDTH; x++) {
            frameData += x === BOARD_WIDTH - 1 ?  '|' : ' ';
        }
    }


    frameData = addDrawToBoard(cloud, frameData, 40, 2);
    frameData = addDrawToBoard(cloud, frameData, 80, 6);
    frameData = addDrawToBoard(cloud2, frameData, 94, 4);
    frameData = addDrawToBoard(cloud2, frameData, 14, 5);
    frameData = addDrawToBoard(igloo, frameData, iglooX, 11);
    frameData = addDrawToBoard(penguin, frameData, 3, penguinY);

    instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
    iglooX -= VELOCITY;

    if (iglooX + getWidthOfDraw(igloo) < 0) iglooX = BOARD_WIDTH;
};

const keypressHandler = (instance, keyName) => {
    switch(keyName) {
    case Key.Space:
        if (jumping) return;

        jump = JUMP_SIZE * -1;
        jumping = true;
        break;
    case 'q':
        instance.exit();
    };
};

export default {
    title: 'Penguin Jump',
    description: 'Jump over obstacules to make points',
    gameData: {
        fps: FPS,
        frameHandler,
        keypressHandler,
    },
};
