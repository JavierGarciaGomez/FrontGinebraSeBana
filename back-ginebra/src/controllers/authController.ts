import { Router, Request, Response } from "express";

import bcrypt from "bcrypt";
import { generateJwt } from "../helpers/generateJwt";
import { User } from "../models/User";
import { catchUndefinedError } from "../helpers/utilities";
import {
  existentObjectResponse,
  invalidParamsResponse,
} from "../helpers/resposeUtilities";
import {
  notAuthorizedResponse,
  notFoundResponse,
} from "../helpers/resposeUtilities";
import {
  IGetUserAuthInfoRequest,
  IGetUserAuthRequest,
} from "../interfaces/interfaces";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password)
      return invalidParamsResponse(
        res,
        "Por favor, envíe su nombre de usuario, email y contraseña"
      );

    let user = await User.findOne({ email });
    if (!user) user = await User.findOne({ username });

    if (user) return existentObjectResponse(res, "El usuario");

    // encrypt pass
    const salt = bcrypt.genSaltSync();
    const cryptedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: cryptedPassword,
      role,
    });
    const savedUser = await newUser.save();

    // Generate JWT
    const token = await generateJwt(
      savedUser._id.toString(),
      savedUser.username,
      savedUser.email,
      savedUser.role
    );

    return res.status(201).json({
      ok: true,
      message: "User created succesfully",
      savedUser,
      token,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getUsers = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const users = await User.find({}, { username: 1, email: 1 });
    return res.status(201).json({
      ok: true,
      message: "getUsers",
      users,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let isValid = false;
    if (user) {
      isValid = bcrypt.compareSync(password, user.password);
    }

    if (!isValid)
      return invalidParamsResponse(res, "email o contraseña incorrecta");

    // Generate JWT
    const token = await generateJwt(
      user!._id.toString(),
      user!.username,
      user!.email,
      user!.role
    );

    return res.status(201).json({
      ok: true,
      message: "Succesfully login",
      token,
      user,
    });
  } catch (error) {
    // uncatchedError(error, res);
  }
};

export const renewToken = async (req: IGetUserAuthRequest, res: Response) => {
  try {
    const { userReq } = req;
    const { uid, username, email, role } = userReq!;

    const token = await generateJwt(uid, username, email, role);

    return res.status(201).json({
      ok: true,
      message: "Token renewed",
      token,
      user: userReq,
    });
  } catch (error) {
    // uncatchedError(error, res);
  }
};

export const updateUser = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;
    const userNewData = { ...req.body };

    const user = await User.findById(userId);
    if (!user) return notFoundResponse(res, "usuario");

    const isAuthorized =
      userRequestRole === "admin" || userRequestUid === userId;

    if (!isAuthorized) return notAuthorizedResponse(res);

    const updatedUser = await User.findByIdAndUpdate(userId, userNewData, {
      new: true,
    });
    return res.status(201).json({
      ok: true,
      message: "User updated succesfully",
      updatedUser,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const changePassword = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;
    const { newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return notFoundResponse(res, "usuario");

    const salt = bcrypt.genSaltSync();
    const cryptedPassword = bcrypt.hashSync(newPassword, salt);

    const isAuthorized =
      userRequestRole === "admin" || userRequestUid === userId;

    if (!isAuthorized) return notAuthorizedResponse(res);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: cryptedPassword },
      {
        new: true,
      }
    );
    return res.status(201).json({
      ok: true,
      message: "User updated succesfully",
      updatedUser,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const deleteUser = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;

    const user = await User.findById(userId);
    if (!user) return notFoundResponse(res, "usuario");

    const isAdmin = userRequestRole === "admin";
    if (!isAdmin) return notAuthorizedResponse(res);

    await User.findByIdAndDelete(userId);

    return res.status(201).json({
      ok: true,
      message: "Usuario eliminado satisfactoriamente",
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};
