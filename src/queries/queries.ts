import { query } from "../config/database";

export const insert = (data: InsertData) => {
  query(
    `INSERT INTO ${data.table} (${Object.keys(data).join(
      ", "
    )}) VALUES (${Object.values(data).join(", ")})`
  );
};
