import games from "../../games";
import { query } from "../config/database";

const joinPrivateParty = async ({ user_uuid, username, gameId }, io) => {

  io.join(gameId);
  await query(`INSERT INTO user_games (user_uuid,game_id) VALUES ($1,$2)`, [user_uuid, gameId])
  io.to(gameId).emit("userJoined", username);
  io.leave(gameId);

}
export default joinPrivateParty;
