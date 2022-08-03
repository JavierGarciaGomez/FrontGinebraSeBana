import { Router, Request, Response } from "express";

import bcrypt from "bcrypt";
import { generateJwt } from "../helpers/generateJwt";
import { User } from "../models/User";
import {
  IGetUserAuthInfoRequest,
  IGetUserAuthRequest,
} from "../interfaces/interfaces";

export const getUsers = async (
  req: IGetUserAuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { userReq } = req;
    const { role: userRequestRole, uid: userRequestUid } = userReq!;

    console.log({ userReq });
    const isAuthorized = userRequestRole === "admin";
    if (!isAuthorized) {
      return res.status(401).json({
        ok: false,
        msg: "No estás autorizado",
      });
    }

    const users = await User.find();
    return res.status(201).json({
      ok: true,
      message: "getUsers",
      users,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.log(errorMessage);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
      error: errorMessage,
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please. Send your username, email and password" });
    }

    let user = await User.findOne({ email });
    if (!user) user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ ok: false, msg: "The user already exists" });
    }

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
    const errorMessage = (error as Error).message;
    console.log(errorMessage);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
      error: errorMessage,
    });
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

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese ese id",
      });
    }

    // the password doesnt change
    const { password } = user;
    const userNewData = { ...req.body, password };

    // is authorized to make changes
    const isAuthorized =
      userRequestRole === "admin" || userRequestUid === userId;
    if (!isAuthorized) {
      return res.status(401).json({
        ok: false,
        msg: "No estás autorizado",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userNewData, {
      new: true,
    });
    return res.status(201).json({
      ok: true,
      message: "User updated succesfully",
      updatedUser,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.log(errorMessage);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
      error: errorMessage,
    });
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

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese ese id",
      });
    }

    // TODO check previous password

    // the password doesnt change
    const { newPassword } = req.body;
    // encrypt pass
    const salt = bcrypt.genSaltSync();
    const cryptedPassword = bcrypt.hashSync(newPassword, salt);

    const userNewData = { ...req.body, password: cryptedPassword };

    // is authorized to make changes
    const isAuthorized =
      userRequestRole === "admin" || userRequestUid === userId;
    if (!isAuthorized) {
      return res.status(401).json({
        ok: false,
        msg: "No estás autorizado",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userNewData, {
      new: true,
    });
    return res.status(201).json({
      ok: true,
      message: "User updated succesfully",
      updatedUser,
    });
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.log(errorMessage);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
      error: errorMessage,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    let isValid = false;
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      isValid = validPassword ? true : false;
    }

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        msg: "Email o contraseña incorrecta",
      });
    }

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
    // check if collaborator or user
    // let user = await Collaborator.findOne({ email });
    // let userType = "collaborator";
    // if (!user) {
    //   user = await User.findOne({ email });
    //   userType = "user";
    // }

    // let isValid = false;

    // if (user) {
    //   const validPassword = bcrypt.compareSync(password, user.password);
    //   if (validPassword) {
    //     isValid = true;
    //   }
    // }

    // if (!isValid) {
    //   return res.status(400).json({
    //     ok: false,
    //     msg: "Email o contraseña incorrecta",
    //   });
    // }

    // Generate JWT
    // const token = await generateJWT(
    //   user.id,
    //   user.col_code,
    //   user.role,
    //   user.imgUrl
    // );

    // generate the log
    // registerLog(userType, user, authTypes.login);

    // res.json({
    //   ok: true,
    //   uid: user.id,
    //   token,
    //   col_code: user.col_code,
    //   role: user.role,
    //   imgUrl: user.imgUrl,
    // });

    res.json({
      ok: true,
      uid: "wa",
      token: "wa",
      col_code: "wa",
      role: "wa",
      imgUrl: "wa",
    });
  } catch (error) {
    // uncatchedError(error, res);
  }
};
