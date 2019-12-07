import {
    createTerminalGameIo,
    ITerminalGameIoOptions,
    ITerminalGameIo,
    Key,
    KeyName,
} from 'terminal-game-io'
import figlet from 'figlet'
import games from './games'

let game: ITerminalGameIo

const logo = figlet.textSync('Steaminal', 'Speed')
const logoLines = logo.split('\n')

const BOARD_WIDTH = 80
const BOARD_HEIGHT = 30

const options = [
    'Snake',
    'Dinossaur Adventure',
]

let selectedOption = 0

const FPS = 60

const line = () => '#'.repeat(BOARD_WIDTH)
const lineContentCentered = (content: string) => {
    let contentLine = '#'

    const spaces = (BOARD_WIDTH - 2 - (content.length)) / 2

    let leftSpace = spaces
    let rightSpace = spaces
    if (spaces % 2 !== 0) {
        leftSpace = Math.trunc(spaces)
        rightSpace = Math.ceil(spaces)
    }

    contentLine += ' '.repeat(leftSpace)
    contentLine += content
    contentLine += ' '.repeat(rightSpace)

    contentLine += '#'
    return contentLine

}

const lineToGame = (gameName: string, index: number) => {
    if (index === selectedOption) {
        return lineContentCentered(` ▶  ${gameName}  `)
    }

    return lineContentCentered(`   ${gameName}  `)
}

const frameHandler = (instance: ITerminalGameIo) => {
    let frameData = line()
    for (let y = 1; y < BOARD_HEIGHT-1; y++) {

        if (y === 3) {
            frameData += logoLines.map(line => lineContentCentered(line)).join('')
            y += logoLines.length - 1
            continue
        }

        if (y === logoLines.length + 5) {
            frameData += lineContentCentered('Welcome to Steaminal')
            frameData += lineContentCentered('Use the keys w and s to navigate')
            y++
            continue
        }

        if (y === logoLines.length + 9) {
            frameData += options.map((option, idx) => lineToGame(option, idx)).join('')

            y += options.length - 1
            continue
        }

        if (y === BOARD_HEIGHT - 4) {
            frameData += lineContentCentered('Press Q to close')
            continue
        }

        if (y === BOARD_HEIGHT - 3) {
            frameData += lineContentCentered('Powered by Tacnoman. Since 2019')
            continue
        }

        frameData += lineContentCentered('')
        continue
    }

    frameData += line()

    try {
        instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
    } catch(e) {
        console.log(frameData.length)
        console.log(BOARD_WIDTH * BOARD_HEIGHT)
        console.log(e.message)
    }
}

const keypressHandler = (instance: ITerminalGameIo, keyName: KeyName) => {
    switch(keyName) {
        case 's':
            selectedOption += 1
            if (selectedOption >= options.length) selectedOption = 0
            break
        case 'w':
            selectedOption -= 1
            if (selectedOption < 0) selectedOption = options.length - 1
            break
        case Key.Enter:
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
