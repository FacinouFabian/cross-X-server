import { v4 } from "uuid";

import games from "../../games";

const createParty = ({ username, themeId }, io) => {
  /* TODO! transform with database */
  const data = games;

  /* db INSERT dans game et dans user_game avec isLeader true et recup la game */
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

  data.push(game);


  console.log("create event");
  io.join(game.id);
  io.to(game.id).emit("partyCreated", game);
  io.leave(game.id);
};

export default createParty;
