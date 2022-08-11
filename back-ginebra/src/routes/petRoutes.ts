import express, { Router, Request, Response } from "express";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator";
import { validateJwt } from "../helpers/validateJwt";
import {
  linkPublicPetToUser,
  linkUser,
  deletePet,
  registerBath,
} from "../controllers/petController";

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
  linkPublicPetToUser: "/linkPublicPetToUser/:petId",
  linkUser: "/linkUser/:petId",
  deletePet: "/deletePet/:petId",
  registerBath: "/registerBath/:petId",
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
petRoutes.get(routes.getPetById, validateJwt, getPetById);
petRoutes.get(routes.getLinkedPetsByUser, validateJwt, getLinkedPetsByUser);
petRoutes.put(routes.updatePet, validateJwt, updatePet);
petRoutes.put(routes.linkPublicPetToUser, validateJwt, linkPublicPetToUser);
petRoutes.put(routes.linkUser, validateJwt, linkUser);
petRoutes.delete(routes.deletePet, validateJwt, deletePet);
petRoutes.post(routes.registerBath, validateJwt, registerBath);
