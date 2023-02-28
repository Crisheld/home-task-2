import express, { Express, Request, NextFunction, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./user/routes";
import groupRoutes from "./group/routes";
import { sequelize } from "./sequilizedb";
import logger from "./logger";
import { AppError } from "./common/AppError";
import { login, verifytoken } from "./user/controller";
import cors from "cors";

dotenv.config();

async function assertDatabaseConnectionOk() {
  logger.info(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    logger.info("Database connection OK!");
  } catch (error) {
    logger.info("Unable to connect to the database:");
    logger.info(error);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  // sequelize.sync({ force: true });

  const app: Express = express();
  const port = 8080; //process.env.PORT;

  app.use(cors)
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes("/login")) {
      logger.info(`reaching endpoint ${req.method}:${req.originalUrl}`);
    } else {
      logger.info(
        `reaching endpoint ${req.method}:${
          req.originalUrl
        } with this body ${JSON.stringify(req.body)}`
      );
    }
    next();
  });

  app.use("/login", login);
  app.use("/user", verifytoken, userRoutes);
  app.use("/group", verifytoken, groupRoutes);

  app.use(
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
      if (error.status) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  );

  app.listen(port, () => {
    logger.info(
      `⚡️[server]: Server is now running at http://localhost:${port}`
    );
  });
}

init();
