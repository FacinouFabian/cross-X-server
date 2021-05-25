import games from "../../games";

const isPartyEnded = ({ winner, gameId }, io) => {
  /* TODO! transform with database */
  //const match = games.find((game) => game.id === gameId);

  // match.state = "ended";
  // match.isEnded = true;

  io.join(gameId);
  io.to(gameId).emit("ended", { winner });
  io.leave(gameId);
};

export default isPartyEnded;
