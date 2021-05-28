import { v4 } from 'uuid'
import { query } from '../config/database'

const createUser = async ({ username, avatarData }, io, socket) => {
  const user = {
    uuid: v4(),
    name: username,
  }

  let params = ''

  for (let i = 1; i <= 21; i++) {
    const value = i === 21 ? `\$${i}` : `\$${i},`
    params += value
  }

  const avatarQuery = `INSERT INTO avatars(
    accessory,
    bgColor,
    bgShape,
    body,
    clothing,
    clothingColor,
    eyebrows,
    eyes,
    facialHair,
    graphic,
    hair,
    hairColor,
    hat,
    hatColor,
    lashes,
    lipColor,
    mouth,
    showBackground,
    size,
    skinTone,
    user_uuid
  ) VALUES (${params})`

  console.log('params ->', params)

  console.log('avatarQuery ->', avatarQuery)

  console.log([...avatarData, user.uuid])

  await query(`INSERT INTO users(uuid,name) VALUES ($1,$2)`, [user.uuid, user.name])
    .catch(() => {
      io.to(socket.id).emit('userCreated', { error: "Ce nom d'utilisateur est déjà utilisé." })
    })
    .then(async () => {
      await query(avatarQuery, [...avatarData, user.uuid])
    })
    .catch(() => {
      io.to(socket.id).emit('userCreated', { error: "Erreur lors de la création de l'avatar, vérifiez vos données." })
    })
    .then(() => {
      io.to(socket.id).emit('userCreated', { data: user })
    })
}

export default createUser
