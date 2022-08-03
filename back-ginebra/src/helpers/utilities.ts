import { Router, Request, Response } from "express";

export const catchUndefinedError = (error: unknown, res: Response) => {
  const errorMessage = (error as Error).message;
  console.log(errorMessage);
  return res.status(500).json({
    ok: false,
    msg: "Hable con el administrador",
    error: errorMessage,
  });
};
