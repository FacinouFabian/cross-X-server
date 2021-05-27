import { query } from '../config/database'

const handleAnswer = async ({ user_uuid, gameId, correct }, io, socket) => {
  if (correct) {
    const res = await query(
      'UPDATE user_games SET points=points+1 WHERE user_uuid=$1 AND game_id=$2 RETURNING points,user_uuid',
      [user_uuid, gameId]
    )
    socket.emit('goodAnswer', res.rows)
    io.in(gameId).emit('goodAnswer', res.rows)
  } else {
    socket.emit('badAnswer')
    io.in(gameId).emit('badAnswer')
  }
}

export default handleAnswer
