import express from "express";
import config from "./config";
import { getDbClient } from "./loader/databse";
import userRouter from "./user/user-controller";

async function startServer() {
  const app = express();
  await getDbClient();
  app.use(express.json());
  app.use("/", userRouter);
  app.listen(config.port, () => {
    console.log(`✅ Server is listening on port: ${config.port}`);
  });
}

startServer();
