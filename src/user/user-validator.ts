import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export function validateRequest(_schema, _location) {
  return async function isValid(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let location: any;
    try {
      //🤔 using yup for validation of our user object
      switch (_location) {
        case "body":
          location = req.body;
          break;
        case "params":
          location = req.params;
          break;
        case "query":
          location = req.query;
          break;
      }
      console.log("In middleware");
      await _schema.validate(location);
      next();
    } catch (e) {
      res.status(400).send({
        error: e,
        message: "Validation error!",
      });
    }
  };
}
