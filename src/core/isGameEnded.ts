import { query } from '../config/database'

const isGameEnded = async ({ winner, user_uuid, gameId }, io) => {
  io.join(gameId)
  await query('UPDATE games SET state=$1 WHERE id=$2', ['ended', gameId])
  await query('UPDATE user_games SET user_hasWin=$1 WHERE user_uuid=$2 AND game_id=$3', [true, user_uuid, gameId])
  io.to(gameId).emit('ended', { winner })
  io.leave(gameId)
}

export default isGameEnded
