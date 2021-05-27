import { query } from '../config/database'

const startGame = async ({ user_uuid, gameId }, io, socket) => {
  const leader = await query(
    `SELECT user_uuid  FROM user_games WHERE game_id=$1 AND user_uuid=$2 AND user_isLeader=$3`,
    [gameId, user_uuid, true]
  )
    .then((res) => {
      return res.rows[0]
    })
    .catch(() => null)

  io.join(gameId)
  if (!leader) {
    /* TODO! send to user socketId instead of gameId */
    socket.emit('error', { message: 'you are not the game leader.' })
  } else {
    // match.state = "started";
    await query('UPDATE games SET state=$1 WHERE id=$2', ['started', gameId])
    io.to(gameId).emit('start')
  }
  io.leave(gameId)
}

export default startGame
