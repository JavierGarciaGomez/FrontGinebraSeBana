import { Router, Request, Response } from "express";

export const notFoundResponse = (res: Response, notFoundElementName: string) =>
  res.status(404).json({
    ok: false,
    msg: `No existe ${notFoundElementName} con ese ese id`,
  });

export const notAuthorizedResponse = (res: Response) =>
  res.status(401).json({ ok: false, msg: "No estás autorizado" });
