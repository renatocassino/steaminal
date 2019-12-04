import {
  createTerminalGameIo,
  ITerminalGameIoOptions,
  ITerminalGameIo,
  Key,
} from 'terminal-game-io'

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

createTerminalGameIo({
  fps: 12,
  frameHandler,
  keypressHandler,
})