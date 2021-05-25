import games from "../../games";

const startGame = ({ username, gameId }, io) => {
  /* TODO! transform with database */
  const match = games.find((game) => game.id === gameId);
  // SELECT USER
  const leader = match.players.find(
    (user) => user.isLeader === true && user.name === username
  );

  io.join(match.id);

  if (!leader) {
    /* TODO! send to user socketId instead of match.id */
    io.to(match.id).emit("error", { message: "you are not the party leader." });
  } else {
    // match.state = "started";
    io.to(match.id).emit("start");
  }

  io.leave(match.id);
};

export default startGame;
