import games from './games'
import {
    createTerminalGameIo,
    ITerminalGameIoOptions,
    ITerminalGameIo,
    Key,
} from 'terminal-game-io'
import clear from 'clear'
import figlet from 'figlet'
import { prompt } from 'inquirer'
let v = 1

const frameHandler = (instance: ITerminalGameIo) => {
    v += 1
    if (v > 9) v = 1
    instance.drawFrame('->' + v, 3, 1)
}

const keypressHandler = (instance: ITerminalGameIo, keyName: string) => {
    //switch (keyName) {
    //  case Key.Escape:
    instance.exit()
    //    break
    //}
}

/*
  createTerminalGameIo({
  fps: 12,
  frameHandler,
  keypressHandler,
  })

*/

const main = async () => {
    clear()

    console.log(figlet.textSync('Steaminal', 'Speed'))
    const key = 'Choose the game'

    const answer = await prompt({
        name: key,
        type: 'list',
        choices: [
            'Snake',
            'Downossaur',
        ],
    })

    const game = answer[key]

    switch(game) {
        case 'Snake': games.Snake()
            break
    }
}

main()
