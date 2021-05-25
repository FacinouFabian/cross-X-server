import pg from "pg";

import config from "./config";

const createDb = () => {
  const pool = new pg.Pool(config);

  pool.connect();

  return new Promise((resolve, reject) => {
    pool.query(`CREATE DATABASE ${process.env.DB_NAME};`, (err, res) => {
      console.log(err, res);
      if (err) reject(err);
      resolve(res);
    });
    pool.end();
  });
};

const createTables = async () => {
  const pool = new pg.Pool({ ...config, database: process.env.DB_NAME });

  pool.connect();

  const queries = [
    "CREATE TABLE users (uuid uuid PRIMARY KEY, name VARCHAR(100) NOT NULL)",
    "CREATE TABLE games (id INT PRIMARY KEY, theme_id INT NOT NULL)",
    `
    CREATE TABLE user_games(
    user_uuid uuid NOT NULL,
    game_id INT NOT NULL,
    points INT DEFAULT 0,
    user_isLeader BOOLEAN DEFAULT false,
    PRIMARY KEY (user_uuid, game_id),
    FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON UPDATE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON UPDATE CASCADE)
    `,
  ];

  for (const query of queries) {
    await pool.query(`${query};`);
  }

  pool.end();
};

export const insert = () => {
  const config = {
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT),
    database: process.env.DB_NAME,
  };

  const pool = new pg.Pool(config);

  pool.connect();

  return new Promise((resolve, reject) => {
    pool.query(`CREATE DATABASE ${process.env.DB_NAME};`, (err, res) => {
      console.log(err, res);
      if (err) reject(err);
      resolve(res);
    });
    pool.end();
  });
};

export const initDatabase = async () => {
  await createDb();
  await createTables();
};
