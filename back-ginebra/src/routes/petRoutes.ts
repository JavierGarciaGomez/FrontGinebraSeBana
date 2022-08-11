import express, { Router, Request, Response } from "express";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator";
import { validateJwt } from "../helpers/validateJwt";

import {
  createPet,
  getPublicPets,
  getAllPets,
  getPetById,
  updatePet,
  getLinkedPetsByUser,
} from "../controllers/petController";

export const petRoutes = Router();
const routes = {
  createPet: "/createPet",
  getPublicPets: "/getPublicPets",
  getAllPets: "/getAllPets",
  getPetById: "/getPetById/:petId",
  getLinkedPetsByUser: "/getLinkedPetsByUser/:userId",
  updatePet: "/updatePet/:petId",
  linkUser: "/linkUser/:petId",
  deletePet: "/deletePet/:petId",
};

// TODO: updatePet
// TODO: deletePet
// TODO: crudBath

petRoutes.post(
  routes.createPet,
  [
    check("petName", "El nombre de la mascota es necesario").isLength({
      min: 2,
    }),
    check(
      "bathPeriodicity",
      "La periodicidad de los baños es necesaria"
    ).notEmpty(),
    fieldValidator,
  ],
  validateJwt,
  createPet
);
petRoutes.get(routes.getPublicPets, getPublicPets);
petRoutes.get(routes.getAllPets, validateJwt, getAllPets);
petRoutes.get(routes.getLinkedPetsByUser, validateJwt, getLinkedPetsByUser);
petRoutes.get(routes.getPetById, validateJwt, getPetById);
petRoutes.put(routes.updatePet, validateJwt, updatePet);
