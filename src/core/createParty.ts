import { v4 } from "uuid";

import games from "../../games";

const createParty = ({ username }, io) => {
  /* TODO! transform with database */
  const data = games;
  const game = {
    id: v4(),
    themeId: 2,
    players: [
      {
        name: username,
        points: 0,
        isLeader: true,
      },
    ],
    state: "waiting",
    isEnded: false,
    round: 0,
  };
  /* db INSERT */
  data.push(game);

  console.log("create event");
  io.join(game.id);
  io.to(game.id).emit("partyCreated", game);
  io.leave(game.id);
};

export default createParty;
