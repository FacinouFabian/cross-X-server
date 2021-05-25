import pg from "pg"

const config = {
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT),
    database: "postgres"
};

const createDb = async (pool: pg.Pool) => {
    pool.query(`CREATE DATABASE ${process.env.DB_NAME};`, (err, res) => {
        console.log(err, res);
    });
}

const createTable = async (pool: pg.Pool, queries: string[]) => {
    queries.map((query) => {
        pool.query(query, (err, res) => {
            console.log(err, res);
            pool.end();
        });
    })

}

export const initDatabase = async () => {
    const pool = new pg.Pool(config);
    await createDb(pool)
    const queries = [
        "CREATE TABLE user(uuid UUID PRIMARY KEY, name text NOT NULL)",
        "CREATE TABLE game(id integer PRIMARY KEY AUTO_INCREMENT, theme_id integer NOT NULL)",
        `
        CREATE TABLE user_game(
        user_uuid integer NOT NULL,
        game_id integer NOT NULL,
        points integer DEFAULT 0,
        user_isLeader boolean DEFAULT false,
        PRIMARY KEY (user_uuid, game_id),
        FOREIGN KEY (user_uuid) REFERENCES user(uuid) ON UPDATE CASCADE,
        FOREIGN KEY (game_id) REFERENCES game(id) ON UPDATE CASCADE)
        `
    ]
    await createTable(pool, queries)


}

