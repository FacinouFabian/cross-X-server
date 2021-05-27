import { v4 } from "uuid";
import { query } from "../config/database";


const createUser = async ({ username }, io) => {
  const user = {
    uuid: v4(),
    name: username
  }
  await query(`INSERT INTO users(uuid,name) VALUES ($1,$2)`, [user.uuid, user.name])
  console.log("createUser event");
  io.emit("userCreated", user);
};

export default createUser;
