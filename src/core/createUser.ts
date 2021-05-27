import { v4 } from 'uuid'
import { query } from '../config/database'

const createUser = async ({ username }, io, socket) => {
  const user = {
    uuid: v4(),
    name: username,
  }

  await query(`INSERT INTO users(uuid,name) VALUES ($1,$2)`, [user.uuid, user.name])
    .then(() => {
      io.to(socket.id).emit('userCreated', { data: user })
    })
    .catch(() => {
      io.to(socket.id).emit('userCreated', { error: "Ce nom d'utilisateur est déjà utilisé." })
    })
}

export default createUser
