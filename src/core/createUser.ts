import { v4 } from 'uuid'
import { query } from '../config/database'

const createUser = async ({ username }, _, socket) => {
  console.log('createUser event')

  const user = {
    uuid: v4(),
    name: username,
  }
  await query(`INSERT INTO users(uuid,name) VALUES ($1,$2)`, [user.uuid, user.name])
  await query(`INSERT INTO users(uuid,name) VALUES ($1,$2)`, [user.uuid, user.name])
    .then(() => {
      socket.emit('userCreated', user)
    })
    .catch(() => {
      socket.emit('error', { message: "Ce nom d'utilisateur est déjà utilisé." })
    })
}

export default createUser
