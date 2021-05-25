import games from "../../games";

const joinPublicParty = ({ username, themeId }, io) => {
  /* TODO! transform with database */
  const matchList = games.filter((game) => game.themeId === themeId);
  const match = matchList[Math.floor(Math.random() * matchList.length)];
  // INSERT GAME
  match.players.push(username);

  io.join(match.id);
  io.to(match.id).emit("userJoined", match);
  io.leave(match.id);
};

export default joinPublicParty;
