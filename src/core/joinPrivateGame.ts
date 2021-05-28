import { query } from '../config/database'

const joinPrivateGame = async ({ user_uuid, username, gameId }, io, socket) => {
  const game = await query(`SELECT * FROM games WHERE is_private=$1 AND state=$2 and id=$3`, [true, 'waiting', gameId])
    .then((res) => {
      return res.rows[0]
    })
    .catch(() => null)
  if (game) {
    await query(`INSERT INTO user_games (user_uuid,game_id) VALUES ($1,$2)`, [user_uuid, gameId])

    const avatar = await query(`SELECT * [except id,user_uuid] FROM avatars WHERE user_uuid=$1`, [user_uuid])

    socket.join(gameId)
    socket.emit('userJoined', { user_uuid, username, avatar })
    io.to(gameId).emit('userJoined', { user_uuid, username, avatar })
  } else {
    console.log('echec.')
  }
}
export default joinPrivateGame
