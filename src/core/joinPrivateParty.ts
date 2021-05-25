import games from "../../games";

const joinPrivateParty = ({ username, gameId }, io) => {
  /* TODO! transform with database */
  //SELECT
  const match = games.find((game) => game.id === gameId);
  // Insert user_game 
  match.players.push(username);

  io.join(match.id);
  io.to(match.id).emit("userJoined", match);
  io.leave(match.id);
};

export default joinPrivateParty;
