import { Key } from 'terminal-game-io';

const FPS = 8;

const BOARD_WIDTH = 140;
const BOARD_HEIGHT = 15;
const JUMP_SIZE = 4;
const VELOCITY = 4;
const CLOUD_VELOCITY = 4;
const TIME_TO_CLOSE_EYES = 10;

let score = 0;

const getWidthOfDraw = draw => draw.split('\n').map(l => l.length).sort((a, b) => b < a ? -1 : 1).shift();
const getHeightOfDraw = draw => draw.split('\n').length - 1;

const penguin = `
 __
( o>
///\\
\\V_/_`;

const penguinClosedEyes = `
 __
( ->
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
let initialPenguinPositionY = BOARD_HEIGHT - getHeightOfDraw(penguin);
let penguinY = initialPenguinPositionY;
let jump = 0;
let jumping = false;

const clouds = [];
let cloudDraw = cloud2;

const getBetween = (min, max) => (
    Math.floor(Math.random() * max) + min
);

for (let i = 0, nClouds = 4; i < nClouds; i++) {
    cloudDraw = (cloudDraw === cloud) ? cloud2 : cloud;

    const x = Math.round(BOARD_WIDTH / nClouds * i);
    const y = getBetween(0, 3);

    clouds.push({ draw: cloudDraw, x, y });
}

const addDrawToBoard = (draw, board, x = 0, y = 0) => {
    const drawLines = draw.split('\n');
    if (drawLines[0] === '') drawLines.shift();

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

let counterToCloud = 0;
let counterPenguinCloseEyes = 0;

const frameHandler = (instance) => {
    counterToCloud++;

    if (counterToCloud === CLOUD_VELOCITY) {
        for (let i = 0; i < clouds.length; i++) {
            clouds[i].x = clouds[i].x - 1;
            if (clouds[i].x < -10) clouds[i].x = BOARD_WIDTH + 10;
        }
        counterToCloud = 0;
    }

    if (jumping) {
        penguinY = Math.round(jump + penguinY);
        jump += 1;

        if (penguinY >= initialPenguinPositionY) {
            penguinY = initialPenguinPositionY;
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

    for (let i = 0; i < clouds.length; i++) {
        const currentCloud = clouds[i];
        frameData = addDrawToBoard(currentCloud.draw, frameData, currentCloud.x, currentCloud.y);
    }

    frameData = addDrawToBoard(igloo, frameData, iglooX, 11);

    if (counterPenguinCloseEyes === TIME_TO_CLOSE_EYES) {
        frameData = addDrawToBoard(penguinClosedEyes, frameData, 3, penguinY);
        counterPenguinCloseEyes = 0;
    } else {
        frameData = addDrawToBoard(penguin, frameData, 3, penguinY);
        counterPenguinCloseEyes++;
    }

    const scoreText = `Score: ${score}`;
    frameData = addDrawToBoard(scoreText, frameData, BOARD_WIDTH - scoreText.length - 2, 0);
    score++;

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
