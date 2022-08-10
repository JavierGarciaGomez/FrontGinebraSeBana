import { Router, Request, Response } from "express";

export const invalidParamsResponse = (res: Response, msg = "Invalid params") =>
  res.status(400).json({ ok: false, msg });

export const existentObjectResponse = (res: Response, object: string) =>
  res.status(400).json({ ok: false, msg: `${object} ya existe` });

export const notAuthorizedResponse = (res: Response) =>
  res.status(401).json({ ok: false, msg: "No estás autorizado" });

export const notFoundResponse = (res: Response, notFoundElementName: string) =>
  res.status(404).json({
    ok: false,
    msg: `No existe ${notFoundElementName} con ese ese id`,
  });

export const undefinedErrorResponse = (res: Response, errorMessage: string) => {
  return res.status(500).json({
    ok: false,
    msg: `Hable con el administrador. Error: ${errorMessage}`,
  });
};
