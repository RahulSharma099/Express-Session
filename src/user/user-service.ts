import { Request, Response, Router } from "express";
import { validateRequest } from "./user-validator";
import { userSchema } from "./user-schema";
import { createUser } from "./user-controller";
const userRouter = Router();

userRouter.post(
  "/user",
  validateRequest(userSchema, "body"),
  async (req: Request, res: Response) => {
    try {
      if (req.body) {
        const user = await createUser(req.body);
        res.status(201).send(user);
      }
    } catch (e) {
      res.status(500).send({
        errorName: e.name,
        error: e,
      });
    }
  }
);

export default userRouter;
