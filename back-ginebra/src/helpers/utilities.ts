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
  creator: boolean = false
): Promise<IPet | null> => {
  const pet = await Pet.findById(petId);

  let preexistenUser = false;

  let newLinkedUsers = pet?.linkedUsers.map((element) => {
    if (element.linkedUser._id.toString() === userId) {
      console.log("IS PREEX");
      preexistenUser = true;
      element.editAuthorization = editAuthorization;
      element.viewAuthorization = viewAuthorization;
      element.creator = creator;
    }
    return element;
  });

  if (!preexistenUser) {
    newLinkedUsers = [...pet!.linkedUsers];
    newLinkedUsers.push({
      linkedUser: new mongoose.Types.ObjectId(userId),
      viewAuthorization,
      editAuthorization,
      creator,
    });
  }

  return Pet.findByIdAndUpdate(
    petId,
    { linkedUsers: newLinkedUsers },
    { new: true }
  ).populate({
    path: "linkedUsers.linkedUser",
    select: "username email imgUrl",
  });
};

export const getPetByIdPopulateUser = async (petId: string) =>
  await Pet.findById(petId).populate({
    path: "linkedUsers.linkedUser",
    select: "username email imgUrl",
  });

export const checkIfIsALinkedUser = async (pet: IPet, userId: string) =>
  await pet.linkedUsers.find(
    (linkedUser) => linkedUser.linkedUser._id.toString() === userId
  );

export const isAuthorizedToEditPet = (
  pet: IPet,
  userRequest_id: string
): boolean => {
  const linkedUser = pet.linkedUsers.find((linkedUser) => {
    if (
      linkedUser.linkedUser.toString() === userRequest_id &&
      linkedUser.editAuthorization
    ) {
      return linkedUser;
    }
  });
  if (linkedUser) return true;
  return false;
};

export const checkIfUserIsCreator = (pet: IPet, userId: string): boolean => {
  console.log({ pet, userId });
  console.log({ linked: pet.linkedUsers });
  const isCreator = pet.linkedUsers.find(
    (linkedUser) =>
      linkedUser.linkedUser.toString() === userId && linkedUser.creator
  );
  if (isCreator) return true;
  return false;
};
