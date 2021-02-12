import * as yup from "yup";
import { userSchema } from "./user-schema";
import { getDbClient } from "../loader/databse";

type User = yup.InferType<typeof userSchema>;

export async function createUser(user: User) {
  try {
    let newUser = (await userSchema.cast(user)) || user;
    //😌 require db client
    const dbClient = await getDbClient();
    return await dbClient.db().collection("user").insertOne(newUser);
  } catch (e) {
    return {
      errorName: e.name,
      error: e,
    };
  }
}
