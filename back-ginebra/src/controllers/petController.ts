import { Router, Request, Response } from "express";

import bcrypt from "bcrypt";
import { generateJwt } from "../helpers/generateJwt";
import { User } from "../models/User";
import { Pet } from "../models/Pet";
import { IPet, IGetUserAuthRequest } from "../interfaces/interfaces";
import { catchUndefinedError } from "../helpers/utilities";
import mongoose from "mongoose";

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
    const savedPet = await newPet.save();
    savedPet.linkedUsers.push({
      linkedUser: new mongoose.Types.ObjectId(userRequestUid),
      viewAuthorization: true,
      editAuthorization: true,
      creator: true,
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

export const updatePet = async (req: IGetUserAuthRequest, res: Response) => {
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

// export const updateUser = async (
//   req: IGetUserAuthRequest,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { userId } = req.params;
//     const { userReq } = req;
//     const { role: userRequestRole, uid: userRequestUid } = userReq!;

//     // check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe usuario con ese ese id",
//       });
//     }

//     // the password doesnt change
//     const { password } = user;
//     const userNewData = { ...req.body, password };

//     // is authorized to make changes
//     const isAuthorized =
//       userRequestRole === "admin" || userRequestUid === userId;
//     if (!isAuthorized) {
//       return res.status(401).json({
//         ok: false,
//         msg: "No estás autorizado",
//       });
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, userNewData, {
//       new: true,
//     });
//     return res.status(201).json({
//       ok: true,
//       message: "User updated succesfully",
//       updatedUser,
//     });
//   } catch (error) {
//     const errorMessage = (error as Error).message;
//     console.log(errorMessage);
//     return res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//       error: errorMessage,
//     });
//   }
// };

// export const changePassword = async (
//   req: IGetUserAuthRequest,
//   res: Response
// ): Promise<Response> => {
//   try {
//     const { userId } = req.params;
//     const { userReq } = req;
//     const { role: userRequestRole, uid: userRequestUid } = userReq!;

//     // check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No existe usuario con ese ese id",
//       });
//     }

//     // TODO check previous password

//     // the password doesnt change
//     const { newPassword } = req.body;
//     // encrypt pass
//     const salt = bcrypt.genSaltSync();
//     const cryptedPassword = bcrypt.hashSync(newPassword, salt);

//     const userNewData = { ...req.body, password: cryptedPassword };

//     // is authorized to make changes
//     const isAuthorized =
//       userRequestRole === "admin" || userRequestUid === userId;
//     if (!isAuthorized) {
//       return res.status(401).json({
//         ok: false,
//         msg: "No estás autorizado",
//       });
//     }

//     const updatedUser = await User.findByIdAndUpdate(userId, userNewData, {
//       new: true,
//     });
//     return res.status(201).json({
//       ok: true,
//       message: "User updated succesfully",
//       updatedUser,
//     });
//   } catch (error) {
//     const errorMessage = (error as Error).message;
//     console.log(errorMessage);
//     return res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//       error: errorMessage,
//     });
//   }
// };

// export const userLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     let isValid = false;
//     if (user) {
//       const validPassword = bcrypt.compareSync(password, user.password);
//       isValid = validPassword ? true : false;
//     }

//     if (!isValid) {
//       return res.status(400).json({
//         ok: false,
//         msg: "Email o contraseña incorrecta",
//       });
//     }

//     // Generate JWT
//     const token = await generateJwt(
//       user!._id.toString(),
//       user!.username,
//       user!.email,
//       user!.role
//     );

//     return res.status(201).json({
//       ok: true,
//       message: "Succesfully login",
//       token,
//       user,
//     });
//     // check if collaborator or user
//     // let user = await Collaborator.findOne({ email });
//     // let userType = "collaborator";
//     // if (!user) {
//     //   user = await User.findOne({ email });
//     //   userType = "user";
//     // }

//     // let isValid = false;

//     // if (user) {
//     //   const validPassword = bcrypt.compareSync(password, user.password);
//     //   if (validPassword) {
//     //     isValid = true;
//     //   }
//     // }

//     // if (!isValid) {
//     //   return res.status(400).json({
//     //     ok: false,
//     //     msg: "Email o contraseña incorrecta",
//     //   });
//     // }

//     // Generate JWT
//     // const token = await generateJWT(
//     //   user.id,
//     //   user.col_code,
//     //   user.role,
//     //   user.imgUrl
//     // );

//     // generate the log
//     // registerLog(userType, user, authTypes.login);

//     // res.json({
//     //   ok: true,
//     //   uid: user.id,
//     //   token,
//     //   col_code: user.col_code,
//     //   role: user.role,
//     //   imgUrl: user.imgUrl,
//     // });

//     res.json({
//       ok: true,
//       uid: "wa",
//       token: "wa",
//       col_code: "wa",
//       role: "wa",
//       imgUrl: "wa",
//     });
//   } catch (error) {
//     // uncatchedError(error, res);
//   }
// };
