import games from "../../games";

const handleAnswer = ({ username, gameId, correct }, io) => {
  /* TODO! transform with database */
  const match = games.find((game) => game.id === gameId);

  io.join(match.id);

  if (correct) {
    const sender = match.players.find((user) => user.name === username);
    // UPDATE user
    sender.points++;
    //  match.round++;
    io.to(match.id).emit("goodAnswer", match);
  } else {
    io.to(match.id).emit("badAnswer", match);
  }
  io.leave(match.id);
};

export default handleAnswer;
