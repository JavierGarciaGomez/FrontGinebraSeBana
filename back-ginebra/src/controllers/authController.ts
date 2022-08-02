import { Router, Request, Response } from "express";
import User from "../models/User";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "Please. Send your email and password" });
    }

    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "The User already Exists" });
    }

    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
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
