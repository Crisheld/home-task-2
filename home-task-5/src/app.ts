import express, { Express, Request, NextFunction, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./user/routes";
import groupRoutes from "./group/routes";
import { sequelize } from "./sequilizedb";
import logger from "./logger";

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

  // sequelize.sync({ force: true });

  const app: Express = express();
  const port = 8080; //process.env.PORT;

  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`reaching endpoint ${req.method}:${req.originalUrl} with this body ${JSON.stringify(req.body)}`);
    next();
  });

  app.use("/user", userRoutes);
  app.use("/group", groupRoutes);

  app.listen(port, () => {
    console.log(
      `⚡️[server]: Server is now running at http://localhost:${port}`
    );
  });
}

init();
