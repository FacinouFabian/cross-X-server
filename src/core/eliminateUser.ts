const userEliminated = ({ username, gameId }, io) => {
  /* TODO! transform with database */
  // const match = games.find((game) => game.id === gameId);
  io.join(gameId)
  io.to(gameId).emit('eliminate', { username })
  io.leave(gameId)
}

export default userEliminated
