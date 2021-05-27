const userHasBuzz = ({ username, gameId }, io) => {
  /* TODO! transform with database */
  // const match = games.find((game) => game.id === gameId);
  io.join(gameId)
  io.to(gameId).emit('buzz', { username })
  io.leave(gameId)
}

export default userHasBuzz
