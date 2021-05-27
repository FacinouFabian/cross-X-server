import { v4 } from 'uuid'
import { query } from '../config/database'

const createGame = async ({ user_uuid, theme_id, is_private }, io, socket) => {
  const game = {
    id: v4(),
    theme_id,
    is_private,
  }
  await query(`INSERT INTO games (id,theme_id,is_private) VALUES ($1,$2,$3)`, [game.id, theme_id, game.is_private])
  await query(`INSERT INTO user_games (user_uuid,game_id,user_isLeader) VALUES ($1,$2,$3)`, [user_uuid, game.id, true])
  console.log('create game event')
  socket.join(game.id)
  socket.emit('gameCreated', game)
}

export default createGame
