// lib/sequelize.ts
import { Sequelize } from "sequelize";

const DB_HOST = process.env.DB_HOST!;
const DB_USER = process.env.DB_USER!;
const DB_PASS = process.env.DB_PASS!;
const DB_NAME = process.env.DB_NAME!;
const DB_PORT = process.env.DB_PORT!;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  dialectModule: require("mysql2"),
});

console.log("Connecting to database...");
console.log("DB_NAME:", process.env.DB_NAME);

export default sequelize;
