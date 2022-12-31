import express, { Express } from "express";
import dotenv from "dotenv";
import userRoutes from "./user/routes";

dotenv.config();

const app: Express = express();
const port = 8080; //process.env.PORT;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
