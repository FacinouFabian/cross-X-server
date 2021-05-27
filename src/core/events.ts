import joinPrivateGame from './joinPrivateGame'
import createGame from './createGame'
import handleAnswer from './handleAnswer'
import isGameEnded from './isGameEnded'
import joinPublicGame from './joinPublicGame'
import startGame from './startGame'
import eliminateUser from './eliminateUser'
import userHasBuzz from './userHasBuzz'
import { Action, CustomEvent } from '../../definitions'
import createUser from './createUser'

const events: CustomEvent[] = [
  {
    eventName: 'joinPrivate',
    action: joinPrivateGame as Action,
  },
  {
    eventName: 'joinPublic',
    action: joinPublicGame as Action,
  },
  {
    eventName: 'createGame',
    action: createGame as Action,
  },
  {
    eventName: 'createUser',
    action: createUser as Action,
  },
  {
    eventName: 'answer',
    action: handleAnswer as Action,
  },
  {
    eventName: 'endGame',
    action: isGameEnded as Action,
  },
  {
    eventName: 'start',
    action: startGame as Action,
  },
  {
    eventName: 'eliminate',
    action: eliminateUser as Action,
  },
  {
    eventName: 'buzz',
    action: userHasBuzz as Action,
  },
]

export default events
