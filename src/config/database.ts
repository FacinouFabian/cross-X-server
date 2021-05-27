import pg from 'pg'
import config from './config'
import readline from 'readline'
import createUser from '../core/createUser'

const createDb = () => {
  const pool = new pg.Pool(config)

  pool.connect()

  return new Promise((resolve, reject) => {
    pool.query(`CREATE DATABASE ${process.env.DB_NAME};`, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
    pool.end()
  })
}

const dropDb = () => {
  const pool = new pg.Pool(config)

  pool.connect()

  return new Promise((resolve, reject) => {
    pool.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME};`, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
    pool.end()
  })
}

const createTables = async () => {
  const pool = new pg.Pool({ ...config, database: process.env.DB_NAME })

  pool.connect()

  const queries = [
    'CREATE TABLE IF NOT EXISTS users (uuid uuid PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE)',

    `CREATE TABLE IF NOT EXISTS games (id VARCHAR(100) PRIMARY KEY, theme_id INT NOT NULL, is_private  BOOLEAN DEFAULT false, state varchar(50) DEFAULT 'waiting' )`,
    `
    CREATE TABLE IF NOT EXISTS user_games(
    user_uuid uuid NOT NULL,
    game_id VARCHAR(100) NOT NULL,
    points INT DEFAULT 0,
    user_isLeader BOOLEAN DEFAULT false,
    user_hasWin BOOLEAN DEFAULT false,
    PRIMARY KEY (user_uuid, game_id),
    FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON UPDATE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON UPDATE CASCADE)
    `,
  ]

  for (const query of queries) {
    await pool.query(`${query};`)
  }

  pool.end()
}

const resetDb = () => {
  dropDb()
    .then(async () => {
      await createDb()
      await createTables()
      console.log('Done.')
    })
    .catch((e) => {
      console.log(e)
    })
}

export const query = (query: string, data: unknown[] = []): Promise<pg.QueryResult<any>> => {
  const pool = new pg.Pool({ ...config, database: process.env.DB_NAME })

  pool.connect()

  return new Promise((resolve, reject) => {
    pool.query(`${query};`, data, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
    pool.end()
  })
}

export const initDatabase = async () => {
  createDb()
    .then(async () => {
      await createTables()
    })
    .catch(() => {
      resetDb()
    })
}
