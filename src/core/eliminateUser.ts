const userEliminated = ({ username, gameId }, io) => {
  io.to(gameId).emit('eliminate', { username })
}

export default userEliminated
