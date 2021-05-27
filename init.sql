CREATE TABLE IF NOT EXISTS users (uuid uuid PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS games (id VARCHAR(100) PRIMARY KEY, theme_id INT NOT NULL, is_private  BOOLEAN DEFAULT false, state varchar(50) DEFAULT 'waiting' );
CREATE TABLE IF NOT EXISTS user_games (
    user_uuid uuid NOT NULL,
    game_id VARCHAR(100) NOT NULL, 
    points INT DEFAULT 0,
    user_isLeader BOOLEAN DEFAULT false,
    user_hasWin BOOLEAN DEFAULT false,
PRIMARY KEY (user_uuid, game_id), 
FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON UPDATE CASCADE, 
FOREIGN KEY (game_id) REFERENCES games(id) ON UPDATE CASCADE);