import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserToken, IGetUserAuthRequest } from "../interfaces/interfaces";

// 344

export const validateJwt = (
  req: IGetUserAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // x-token headers
    const token = req.header("x-token");

    console.log({ token });
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la petición",
      });
    }
    // decode the payload and add it to the request
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED!);

    console.log({ payload });
    const user = payload as IUserToken;
    req.userReq = user;
  } catch (error) {
    console.log("ERROR", error);
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next();
};
