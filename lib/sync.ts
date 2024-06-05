// lib/sync.ts
import sequelize from "./sequelize";
import Promotion from "./models/Promotion";

async function sync() {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } to drop tables if they already exist
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

sync();
