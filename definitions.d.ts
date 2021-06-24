import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

type Action = <T, U>(payload?: T, socket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => U

type CustomEvent = {
  eventName: string
  action: Action
}
