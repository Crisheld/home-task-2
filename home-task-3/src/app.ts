import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./user/routes";
import { sequelize } from "./sequilizedb";

dotenv.config();

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  const app: Express = express();
  const port = 8080; //process.env.PORT;

  app.use(express.json());

  app.use("/user", userRoutes);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

init();
