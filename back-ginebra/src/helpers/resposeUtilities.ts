import { Router, Request, Response } from "express";

export const invalidParamsResponse = (
  res: Response,
  message = "Invalid params"
) => res.status(400).json({ ok: false, message });

export const existentObjectResponse = (res: Response, object: string) =>
  res.status(400).json({ ok: false, message: `${object} ya existe` });

export const notAuthorizedResponse = (res: Response, reasonMsg: string = "") =>
  res
    .status(401)
    .json({ ok: false, message: `No estás autorizado. ${reasonMsg}` });

export const notFoundResponse = (res: Response, notFoundElementName: string) =>
  res.status(404).json({
    ok: false,
    message: `No existe ${notFoundElementName} con ese ese id`,
  });

export const undefinedErrorResponse = (res: Response, errorMessage: string) => {
  return res.status(500).json({
    ok: false,
    message: `Hable con el administrador. Error: ${errorMessage}`,
  });
};
