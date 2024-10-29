import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { promisify } from "util";

//const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const dbFilePath = join(__dirname, "db.sqlite");
const db = new sqlite3.Database(dbFilePath);

const query = promisify(db.all).bind(db);

export const createKeywordTableQuery = `
  CREATE TABLE IF NOT EXISTS keywords (
    "keyword" TEXT PRIMARY KEY,
    "description" TEXT
  )
`;


export const createPriorityTableQuery = `
  CREATE TABLE IF NOT EXISTS priority (
    "user_id" INTEGER PRIMARY KEY,
    "priority" INTEGER
  )
`;


export const createTable = async (statement) => {
    const res = await query(statement);
    return res;
};


export const insertTable = async ({table, object}) => {
    const keys = Object.keys(object).join(",");
    const values = Object.values(object)
        .map((v) => `"${v}"`)
        .join(",");
    const sql = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
    console.log(`insert table sql: ${sql}`)
    const res = await query(sql);
    return res;
};


// DELETE FROM ${table} WHERE ${COND}
export const deleteTable = async ({table, condition}) => {
  const sql = `DELETE FROM ${table} WHERE ${condition}`;
  console.log(`delete table sql: ${sql}`);
  await query(sql);
};


// UPDATE ${table} SET ${COL}=${col} WHERE ${COND}=${cond}
export const modifyTable = async ({table, object, cond}) => {
  console.log('condition: ', cond);
  const exist = await queryTable({table, condition: cond});
  if (exist.length)
    await deleteTable({table, condition: cond});
  await insertTable({table: table, object: object});
};


export const queryTable = async ({table, condition}) => {
  const sql = `SELECT * FROM ${table} WHERE ${condition}`;
  console.log(`query table sql: ${sql}`);
  const res = await query(sql);
  return res;
};

