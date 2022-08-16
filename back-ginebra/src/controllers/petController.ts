import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { Pet } from "../models/Pet";
import { IPet, IGetUserAuthRequest, IPetBath } from "../interfaces/interfaces";
import {
  catchUndefinedError,
  linkUserToPet,
  getPetByIdPopulateUser,
  checkIfIsALinkedUser,
} from "../helpers/utilities";
import mongoose from "mongoose";
import {
  isAuthorizedToEditPet,
  checkIfUserIsCreator,
} from "../helpers/utilities";
import { existentObjectResponse } from "../helpers/resposeUtilities";
import {
  notFoundResponse,
  notAuthorizedResponse,
  invalidParamsResponse,
} from "../helpers/resposeUtilities";

export const createPet = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { userReq } = req;
    const { role: userRequestRole, _id: userRequest_id } = userReq!;
    const { petName, bathPeriodicity, isPublic } = req.body;
    const newPet = new Pet<IPet>({ ...req.body });

    if (!petName || !bathPeriodicity)
      return invalidParamsResponse(
        res,
        "El nombre de la mascota y la periodicidad del baño son necesarias"
      );

    const savedPet = await newPet.save();

    const updatedPet = await linkUserToPet(
      savedPet.id,
      userRequest_id,
      true,
      true,
      true
    );

    return res.status(201).json({
      ok: true,
      message: "Pet created succesfully",
      pet: updatedPet,
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
    const { role: userRequestRole, _id: userRequest_id } = userReq!;

    const isAuthorized = userRequestRole === "admin";
    if (!isAuthorized) return notAuthorizedResponse(res);

    const pets = await Pet.find();
    return res.status(201).json({
      ok: true,
      message: "getAllPets",
      pets,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getLinkedPetsByUser = async (
  req: IGetUserAuthRequest,
  res: Response
) => {
  try {
    const { userReq } = req;
    const { userId } = req.params;

    const pets = await Pet.find({ "linkedUsers.linkedUser": userId }).populate({
      path: "linkedUsers.linkedUser",
      select: "username email imgUrl",
    });

    return res.status(201).json({
      ok: true,
      message: "getLinkPetsByUser",
      pets,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getGinebra = async (req: IGetUserAuthRequest, res: Response) => {
  try {
    const pet = await Pet.findById("62fbc56a7ac3e2b536ed1153");

    if (!pet) return notFoundResponse(res, "mascota");

    return res.status(201).json({
      ok: true,
      message: "getPet",
      pet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getPetById = async (req: IGetUserAuthRequest, res: Response) => {
  try {
    const { userReq } = req;
    const { role: userRequestRole, _id: userRequest_id } = userReq!;
    const { petId } = req.params;

    const pet = await getPetByIdPopulateUser(petId);

    if (!pet) return notFoundResponse(res, "mascota");

    const isALinkedUser = await checkIfIsALinkedUser(pet, userRequest_id);
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
    const { role: userRequestRole, _id: userRequest_id } = userReq!;
    const petNewData = { ...req.body };

    const pet = await Pet.findById(petId);
    if (!pet) return notFoundResponse(res, "mascota");

    // isAuthorized
    const isAuthorizedToEdit = isAuthorizedToEditPet(pet, userRequest_id);
    const isAdmin = userRequestRole === "admin";
    if (!isAdmin && !isAuthorizedToEdit) return notAuthorizedResponse(res);

    const updatedPet = await Pet.findByIdAndUpdate(petId, petNewData, {
      new: true,
    }).populate({
      path: "linkedUsers.linkedUser",
      select: "username email imgUrl",
    });

    return res.status(201).json({
      ok: true,
      message: "Pet updated succesfully",
      pet: updatedPet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const linkPublicPetToUser = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { petId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, _id: userRequest_id } = userReq!;

    const pet = await Pet.findById(petId);
    const user = await User.findById(userRequest_id);

    if (!pet || !user) return notFoundResponse(res, "mascota o usuario");

    const isAlreadyALinkedUser = await checkIfIsALinkedUser(
      pet,
      userRequest_id
    );

    if (isAlreadyALinkedUser) return existentObjectResponse(res, "mascota");

    if (!pet.isPublic)
      return notAuthorizedResponse(res, "La mascota no es pública.");

    const updatedPet = await linkUserToPet(
      petId,
      userRequest_id,
      true,
      false,
      false
    );

    return res.status(201).json({
      ok: true,
      message: "Pet updated succesfully",
      updatedPet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const linkUser = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { petId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, _id: userRequest_id } = userReq!;
    const userLinkData = { ...req.body }; // {userId, view, edit}

    const pet = await Pet.findById(petId);
    const user = await User.findById(userRequest_id);

    if (!pet || !user) return notFoundResponse(res, "mascota o usuario");

    // isAuthorized
    // const isAuthorizedToEdit = isAuthorizedToEditPet(pet, userRequest_id);
    const isAuthorizedToEdit = true;
    const isAdmin = userRequestRole === "admin";
    const isUserToEditCreator = checkIfUserIsCreator(
      pet,
      userLinkData.linkedUser
    );

    if (isUserToEditCreator || (!isAdmin && !isAuthorizedToEdit))
      return notAuthorizedResponse(res);

    const updatedPet = await linkUserToPet(
      petId,
      userLinkData.linkedUser,
      userLinkData.viewAuthorization,
      userLinkData.editAuthorization
    );

    return res.status(201).json({
      ok: true,
      message: "Pet updated succesfully",
      pet: updatedPet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const deletePet = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { petId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, _id: userRequest_id } = userReq!;

    const pet = await Pet.findById(petId);

    if (!pet) return notFoundResponse(res, "mascota");

    const isAdmin = userRequestRole === "admin";
    const isCreator = checkIfUserIsCreator(pet, userRequest_id);

    if (!isCreator && !isAdmin) return notAuthorizedResponse(res);

    await Pet.findByIdAndDelete(petId);

    return res.status(201).json({
      ok: true,
      message: "Mascota eliminada satisfactoriamente",
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const registerBath = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { petId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, _id: userRequest_id } = userReq!;
    const bathData: IPetBath = { ...req.body }; // bather, shampoos, bathTypes

    bathData.date = new Date();

    const pet = await Pet.findById(petId);
    if (!pet) return notFoundResponse(res, "mascota");

    const isAdmin = userRequestRole === "admin";
    const isAuthorizedToEdit = isAuthorizedToEditPet(pet, userRequest_id);

    if (!isAdmin && !isAuthorizedToEdit) return notAuthorizedResponse(res);

    pet.registeredBaths.push(bathData);

    const updatedPet = await Pet.findByIdAndUpdate(petId, pet, {
      new: true,
    }).populate({
      path: "linkedUsers.linkedUser",
      select: "username email imgUrl",
    });

    return res.status(201).json({
      ok: true,
      message: "Bath registered correctly",
      pet: updatedPet,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};
