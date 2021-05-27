const userHasBuzz = ({ username, gameId }, io) => {
  io.to(gameId).emit('buzz', { username })
}

export default userHasBuzz
