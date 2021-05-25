import joinParty from "./joinPrivateParty";
import createParty from "./createParty";

type Action = <T, U>(payload: T, io: any) => U;

type CustomEvent = {
  eventName: string;
  action: <T, U>(payload: T, io: any) => U;
};

const events: CustomEvent[] = [
  {
    eventName: "join",
    action: joinParty as Action,
  },
  {
    eventName: "create",
    action: createParty as Action,
  },
];

export default events;
