CREATE TABLE IF NOT EXISTS users (
    uuid uuid PRIMARY KEY, 
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS games (
    id VARCHAR(100) PRIMARY KEY, 
    theme_id INT NOT NULL, 
    is_private BOOLEAN DEFAULT false, 
    state varchar(50) DEFAULT 'waiting'
);

CREATE TABLE IF NOT EXISTS user_games (
    user_uuid uuid NOT NULL,
    game_id VARCHAR(100) NOT NULL, 
    points INT DEFAULT 0,
    user_isLeader BOOLEAN DEFAULT false,
    user_hasWin BOOLEAN DEFAULT false,
    PRIMARY KEY (user_uuid, game_id), 
    FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON UPDATE CASCADE, 
    FOREIGN KEY (game_id) REFERENCES games(id) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS avatars (
    id SERIAL NOT NULL,
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
    PRIMARY KEY (id, user_uuid),
    FOREIGN KEY (user_uuid) REFERENCES users(uuid) ON UPDATE CASCADE
);