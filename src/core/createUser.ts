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
    accessory VARCHAR(50) NOT NULL,
    bgColor VARCHAR(50) NOT NULL,
    bgShape VARCHAR(50) NOT NULL,
    body VARCHAR(50) NOT NULL,
    clothing VARCHAR(50) NOT NULL,
    clothingColor VARCHAR(50) NOT NULL,
    eyebrows VARCHAR(50) NOT NULL,
    eyes VARCHAR(50) NOT NULL,
    facialHair VARCHAR(50) NOT NULL,
    graphic VARCHAR(50) NOT NULL,
    hair VARCHAR(50) NOT NULL,
    hairColor VARCHAR(50) NOT NULL,
    hat VARCHAR(50) NOT NULL,
    hatColor VARCHAR(50) NOT NULL,
    lashes BOOLEAN NOT NULL,
    lipColor VARCHAR(50) NOT NULL,
    mouth VARCHAR(50) NOT NULL,
    showBackground BOOLEAN NOT NULL,
    size INT NOT NULL,
    skinTone VARCHAR(50) NOT NULL,
    user_uuid uuid NOT NULL,
  ) VALUES (${params})`

  console.log('avatardata ->', avatarData)

  console.log('params ->', params)

  console.log('avatarQuery ->', avatarQuery)

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
