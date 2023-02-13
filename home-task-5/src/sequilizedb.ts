import { Sequelize, Model, DataTypes } from "sequelize";
import logger from "./logger";


//this data should be retrieved from enviroment params
const dbUser = "wubzvang";
const host = "ziggy.db.elephantsql.com";
const database = "wubzvang";
const password = "4uU6zduk234_N6M-VEa9NVGbYJr47oUr";

export const sequelize = new Sequelize(database, dbUser, password, {
  host,
  dialect: "postgres",
  logging: false,
});

logger.info("sequilize init");