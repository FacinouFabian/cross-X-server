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

  const avatar = [
    avatarData.accessory,
    avatarData.bgColor,
    avatarData.bgShape,
    avatarData.body,
    avatarData.clothing,
    avatarData.clothingColor,
    avatarData.eyebrows,
    avatarData.eyes,
    avatarData.facialHair,
    avatarData.graphic,
    avatarData.hair,
    avatarData.hairColor,
    avatarData.hat,
    avatarData.hatColor,
    avatarData.lashes,
    avatarData.lipColor,
    avatarData.mouth,
    avatarData.showBackground,
    avatarData.size,
    avatarData.skinTone,
    user.uuid,
  ]

  console.log(avatar)

  await query(`INSERT INTO users(uuid,name) VALUES ($1,$2)`, [user.uuid, user.name])
    .catch(() => {
      io.to(socket.id).emit('userCreated', { error: "Ce nom d'utilisateur est déjà utilisé." })
    })
    .then(async () => {
      await query(avatarQuery, avatar)
    })
    .catch(() => {
      io.to(socket.id).emit('userCreated', { error: "Erreur lors de la création de l'avatar, vérifiez vos données." })
    })
    .then(() => {
      io.to(socket.id).emit('userCreated', { data: user })
    })
}

export default createUser
