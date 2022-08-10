import { Router, Request, Response } from "express";
import { undefinedErrorResponse } from "./resposeUtilities";
import { IUser, IPet } from "../interfaces/interfaces";
import { Pet } from "../models/Pet";
import { User } from "../models/User";
import mongoose from "mongoose";

export const catchUndefinedError = (error: unknown, res: Response) => {
  const errorMessage = (error as Error).message;
  console.log(errorMessage);
  return undefinedErrorResponse(res, errorMessage);
};

export const linkUserToPet = async (
  petId: string,
  userId: string,
  viewAuthorization: boolean,
  editAuthorization: boolean,
  creator: boolean
): Promise<IPet | null> => {
  const pet = await Pet.findById(petId);

  pet?.linkedUsers.push({
    linkedUser: new mongoose.Types.ObjectId(userId),
    viewAuthorization,
    editAuthorization,
    creator,
  });

  return Pet.findByIdAndUpdate(petId, pet!, { new: true });
};
