import { query } from '../config/database'

export const insert = (table: string, data: unknown) => {
  query(`INSERT INTO ${table} (${Object.keys(data).join(', ')}) VALUES (${Object.values(data).join(', ')})`)
}
