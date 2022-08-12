// 336
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// this method
export const fieldValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 335 error handling
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let message = "";
    errors.array().forEach((error) => {
      message = message.concat(" ", error.msg);
    });

    return res.status(400).json({
      ok: false,
      errors,
      message,
    });
  }

  next();
};
