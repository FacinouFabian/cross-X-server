import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

type Action = <T, U>(
  payload: T,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  socket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
) => U

type CustomEvent = {
  eventName: string
  action: Action
}
