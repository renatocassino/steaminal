import {
    createTerminalGameIo,
    ITerminalGameIoOptions,
    ITerminalGameIo,
    Key,
    KeyName,
} from 'terminal-game-io'


let game = null

const BOARD_WIDTH = 70
const BOARD_HEIGHT = 30

const options = [
    'Snake',
    'Dinossaur Adventure',
]

let selectedOption = 0

const FPS = 2

const line = () => '#'.repeat(BOARD_WIDTH)
const lineContentCentered = (content: string) => {
    let contentLine = '#'

    const spaces = (BOARD_WIDTH - 2 - (content.length)) / 2

    let leftSpace = spaces
    let rightSpace = spaces
    if (spaces % 2 == 0) {
        leftSpace = Math.round(spaces)
        rightSpace = Math.ceil(spaces)
    }

    contentLine += ' '.repeat(leftSpace)
    contentLine += content
    contentLine += ' '.repeat(rightSpace)

    contentLine += '#'
    return contentLine

}

const frameHandler = (instance: ITerminalGameIo) => {
    let frameData = line()
    for (let y = 1; y < BOARD_HEIGHT-1; y++) {
        if (y === 4) {
            frameData += lineContentCentered('Snake Game')
            continue
        }

        frameData += lineContentCentered('')
        continue

        for (let x = 0; x < BOARD_WIDTH; x++) {
            if (x === 0 || x === BOARD_WIDTH-1 || y === 0 || y === BOARD_HEIGHT - 1) {
                frameData += '%'
                continue
            }
            frameData += ' '
        }
    }

    frameData += line()

    instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
}

const keypressHandler = (instance: ITerminalGameIo, keyName: KeyName) => {
    switch(keyName) {
        case 's':
        selectedOption += 1
        break
        case 'w':
        selectedOption -= 1
        break
        case 'q': process.exit(0)
    }
}

export default () => {
    game = createTerminalGameIo({
        fps: FPS,
        frameHandler,
        keypressHandler,
    })
}
