import games from "../../games";
import { query } from "../config/database";

const joinPublicParty = async ({ username, user_uuid, themeId }, io) => {
  const game = await query(`SELECT  * FROM games WHERE is_private=$1 AND state=$2 and theme_id=$3 ORDER BY random() LIMIT 1`, [false, "waiting", themeId]).then((res) => {
    return res.rows[0]
  }).catch(() => null)
  if (game) {
    io.join(game.id);
    await query(`INSERT INTO user_games (user_uuid,game_id) VALUES ($1,$2)`, [user_uuid, game.id])
    io.to(game.id).emit("userJoined", username);
    io.leave(game.id);
  }
};

export default joinPublicParty;
