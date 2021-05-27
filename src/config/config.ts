import dotenv from 'dotenv'

dotenv.config()

export default {
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT),
  ssl: false

}

