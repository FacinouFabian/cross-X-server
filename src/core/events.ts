import joinPrivateParty from "./joinPrivateParty";
import createParty from "./createParty";
import { Server, Socket, } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import handleAnswer from "./handleAnswer";
import isPartyEnded from "./isPartyEnded";
import joinPublicParty from "./joinPublicParty";
import startGame from "./startGame";
import eliminateUser from "./eliminateUser";
import userHasBuzz from "./userHasBuzz";
import createUser from "./createUser";



type Action = <T, U>(payload: T, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, socket?: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => U;

type CustomEvent = {
  eventName: string;
  action: Action
};

const events: CustomEvent[] = [
  {
    eventName: "joinPrivate",
    action: joinPrivateParty as Action,
  },
  {
    eventName: "joinPublic",
    action: joinPublicParty as Action,
  },
  {
    eventName: "createParty",
    action: createParty as Action,
  },
  {
    eventName: "createUser",
    action: createUser as Action,
  },
  {
    eventName: "answer",
    action: handleAnswer as Action,
  },
  {
    eventName: "endParty",
    action: isPartyEnded as Action,
  },
  {
    eventName: "start",
    action: startGame as Action,
  },
  {
    eventName: "eliminate",
    action: eliminateUser as Action,
  },
  {
    eventName: "buzz",
    action: userHasBuzz as Action,
  },



];

export default events;
