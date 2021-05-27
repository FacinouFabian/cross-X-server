import { query } from '../config/database'

const handleAnswer = async ({ user_uuid, gameId, correct }, io) => {
  /* TODO! transform with database */
  //SELECT

  io.join(gameId)

  if (correct) {
    // UPDATE dans user_game des points
    const res = await query(
      'UPDATE user_games SET points=points+1 WHERE user_uuid=$1 AND game_id=$2 RETURNING points,user_uuid',
      [user_uuid, gameId]
    )
    io.to(gameId).emit('goodAnswer', res.rows)
  } else {
    io.to(gameId).emit('badAnswer')
  }
  io.leave(gameId)
}

export default handleAnswer
