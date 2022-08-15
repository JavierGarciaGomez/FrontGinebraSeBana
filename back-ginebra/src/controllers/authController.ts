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
      ...req.body,
    });
    newUser.password = cryptedPassword;
    newUser.creationDate = new Date();

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
  // TODO: 2 answers, one for public and other for the others
  try {
    const users = await User.find(
      {},
      {
        username: 1,
        email: 1,
        role: 1,
        creationDate: 1,
        fullName: 1,
        imgUrl: 1,
      }
    );
    return res.status(201).json({
      ok: true,
      message: "getUsers",
      users,
    });
  } catch (error) {
    return catchUndefinedError(error, res);
  }
};

export const getUserByUsername = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  // TODO: 2 answers, one for public and other for the others
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return notFoundResponse(res, "usuario");
    return res.status(201).json({
      ok: true,
      message: "getUsers",
      user,
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
    const { _id, username, email, role } = userReq!;

    const token = await generateJwt(_id, username, email, role);
    const user = await User.findById(_id);
    console.log({ user });

    return res.status(201).json({
      ok: true,
      message: "Token renewed",
      token,
      user,
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
    const { role: userRequestRole, _id: userRequest_id } = userReq!;
    const userNewData = { ...req.body };
    console.log({ userNewData });

    const user = await User.findById(userId);
    if (!user) return notFoundResponse(res, "usuario");

    const isAuthorized =
      userRequestRole === "admin" || userRequest_id === userId;

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
    const { role: userRequestRole, _id: userRequest_id } = userReq!;
    const { prevPassword, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return notFoundResponse(res, "usuario");
    let isValidPrevPass = bcrypt.compareSync(prevPassword, user.password);
    if (!isValidPrevPass)
      return invalidParamsResponse(res, "contraseña anterior incorrecta");

    const salt = bcrypt.genSaltSync();
    const cryptedPassword = bcrypt.hashSync(password, salt);

    const isAuthorized =
      userRequestRole === "admin" || userRequest_id === userId;

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
    const { role: userRequestRole, _id: userRequest_id } = userReq!;

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
