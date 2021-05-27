import { query } from '../config/database'

const joinPrivateGame = async ({ user_uuid, username, gameId }, io, socket) => {
  await query(`INSERT INTO user_games (user_uuid,game_id) VALUES ($1,$2)`, [user_uuid, gameId])
  socket.join(gameId)
  socket.emit('userJoined', { user_uuid, username })
  io.to(gameId).emit('userJoined', { user_uuid, username })
}
export default joinPrivateGame
