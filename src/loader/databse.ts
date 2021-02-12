import config from "../config";
import { MongoClient } from "mongodb";
let dbClient: MongoClient;

export async function initDbClient() {
  try {
    dbClient = await MongoClient.connect(config.databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
    });
    console.log("Connected to Database ✔");
    return dbClient;
  } catch (error) {
    throw error;
  }
}

export async function getDbClient() {
  if (!dbClient) {
    await initDbClient();
  }
  return dbClient;
}
