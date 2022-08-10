import { Router, Request, Response } from "express";

import bcrypt from "bcrypt";
import { generateJwt } from "../helpers/generateJwt";
import { User } from "../models/User";
import { Pet } from "../models/Pet";
import { IPet, IGetUserAuthRequest } from "../interfaces/interfaces";
import { catchUndefinedError } from "../helpers/utilities";
import mongoose from "mongoose";
import {
  notFoundResponse,
  notAuthorizedResponse,
} from "../helpers/resposeUtilities";

export const createPet = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;
    const { petName, bathPeriodicity, isPublic } = req.body;

    if (!petName || !bathPeriodicity) {
      return res.status(400).json({
        msg: "El nombre de la mascota y la periodicidad del baño son necesarias",
      });
    }

    const newPet = new Pet<IPet>({ ...req.body });
    newPet.linkedUsers.push({
      linkedUser: new mongoose.Types.ObjectId(userRequestUid),
      viewAuthorization: true,
      editAuthorization: true,
      creator: true,
    });
    const savedPet = await newPet.save();

    // TODO: Link pet to user
    const user = await User.findById(userRequestUid);
    const linkedPets = { user };
    user?.linkedPets?.push({
      linkedPet: savedPet._id,
      viewAuthorization: true,
      editAuthorization: true,
      creator: true,
    });

    const updatedUser = await User.findByIdAndUpdate(userRequestUid, user!, {
      new: true,
    });

    return res.status(201).json({
      ok: true,
      message: "Pet created succesfully",
      savedPet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getPublicPets = async (
  req: IGetUserAuthRequest,
  res: Response
) => {
  try {
    const pets = await Pet.find({ isPublic: true });
    return res.status(201).json({
      ok: true,
      message: "getPublicPets",
      pets,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getAllPets = async (req: IGetUserAuthRequest, res: Response) => {
  try {
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;

    const isAuthorized = userRequestRole === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        ok: false,
        msg: "No estás autorizado",
      });
    }

    const pets = await Pet.find();
    return res.status(201).json({
      ok: true,
      message: "getPublicPets",
      pets,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getPetById = async (req: IGetUserAuthRequest, res: Response) => {
  try {
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;
    const { petId } = req.params;

    const pet = await Pet.findById(petId);
    if (!pet) return notFoundResponse(res, "mascota");

    const isALinkedUser = pet.linkedUsers.find(
      (linkedUser) => linkedUser.linkedUser.toString() === userRequestUid
    );

    const isAdmin = userRequestRole === "admin";
    if (!isAdmin && !isALinkedUser) return notAuthorizedResponse(res);

    return res.status(201).json({
      ok: true,
      message: "getPet",
      pet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const updatePet = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { petId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;

    const pet = await Pet.findById(petId);
    if (!pet) return notFoundResponse(res, "mascota");

    const petNewData = { ...req.body };
    console.log({ petNewData });

    // isAuthorized
    const isALinkedUser = pet.linkedUsers.find(
      (linkedUser) => linkedUser.linkedUser.toString() === userRequestUid
    );
    const isAdmin = userRequestRole === "admin";
    if (!isAdmin && !isALinkedUser) return notAuthorizedResponse(res);

    const updatedPet = await Pet.findByIdAndUpdate(petId, petNewData, {
      new: true,
    });

    console.log({ updatedPet });

    return res.status(201).json({
      ok: true,
      message: "Pet updated succesfully",
      updatedPet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};
