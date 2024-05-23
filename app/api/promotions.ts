import { NextApiRequest, NextApiResponse } from "next";
import pgPromise from "pg-promise";

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const pgp = pgPromise();
const db = pgp({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASS,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const promotions = await db.any("SELECT * FROM promotions");
    res.status(200).json(promotions);
  } catch (err) {
    console.error("Failed to fetch promotions", err);
    res.status(500).json({ error: "Failed to fetch promotions" });
  }
}
