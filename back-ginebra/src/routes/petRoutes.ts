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
  createPetRoute: "/createPet",
  getPublicPetsRoute: "/getPublicPets",
  getAllPetsRoute: "/getAllPets",
  getPetById: "/getPetById/:petId",
  getLinkedPetsByUser: "/getLinkedPetsByUser/:userId",
  updatePetRoute: "/updatePet/:petId",
  linkUser: "/linkUser/:petId",
  deletePetRoute: "/deletePet/:petId",
};

// TODO: updatePet
// TODO: deletePet
// TODO: crudBath

petRoutes.post(
  routes.createPetRoute,
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
petRoutes.get(routes.getPublicPetsRoute, getPublicPets);
petRoutes.get(routes.getAllPetsRoute, validateJwt, getAllPets);
petRoutes.get(routes.getLinkedPetsByUser, validateJwt, getLinkedPetsByUser);
petRoutes.get(routes.getPetById, validateJwt, getPetById);
petRoutes.put(routes.updatePetRoute, validateJwt, updatePet);
