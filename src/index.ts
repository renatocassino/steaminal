import games from './games'
import clear from 'clear'
import figlet from 'figlet'
import { prompt } from 'inquirer'
import menu from './menu'

const main = async () => {
    clear()

    console.log(figlet.textSync('Steaminal', 'Speed'))
    const key = 'Choose the game'


    /*prompt({
        name: key,
        type: 'list',
        choices: [
            'Snake',
            'Downossaur',
        ],
    }).then((answer) => {
    const game = answer[key]*/
    const game = 'Snake'

      switch(game) {
          case 'Snake': games.Snake()
              break
      }
    /*})*/

}

//main()

menu()
