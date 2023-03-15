import { Sequelize } from "sequelize";
import logger from "./logger";

const dbUser = process.env.dbUser || '';
const host = process.env.dbHost;
const database = process.env.database || '';
const password = process.env.password;

console.log(dbUser);
console.log(host);
console.log(database);
console.log(password);

export const sequelize = new Sequelize(database, dbUser, password, {
  host,
  dialect: "postgres",
  logging: false,
});

logger.info("sequilize init");