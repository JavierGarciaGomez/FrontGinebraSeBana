import express, { Router, Request, Response } from "express";
import {
  login,
  createUser,
  updateUser,
  getUsers,
  renewToken,
  getUserByUsername,
} from "../controllers/authController";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/fieldValidator";
import { validateJwt } from "../helpers/validateJwt";
import { changePassword, deleteUser } from "../controllers/authController";

export const authRoutes = Router();
const routes = {
  createUser: "/createUser",
  getUsers: "/getUsers",
  getUserByUsername: "/getUserByUsername/:username",
  login: "/login",
  renewToken: "/renewToken/",
  updateUser: "/updateUser/:userId",
  changePass: "/changepass/:userId",
  deleteUser: "/deleteUser/:userId",
};

/************USERS CRUD********* */
// CREATE USER
authRoutes.post(
  routes.createUser,
  [
    check(
      "username",
      "El nombre de usuario debe tener entre 4 y 16 caracteres"
    ).isLength({ min: 4, max: 16 }),
    check("email", "no es una forma de email correcta").isEmail(),
    fieldValidator,
  ],
  createUser
);
authRoutes.get(routes.getUsers, getUsers);
authRoutes.get(routes.getUserByUsername, validateJwt, getUserByUsername);
authRoutes.post(routes.login, login);
authRoutes.get(routes.renewToken, validateJwt, renewToken);
authRoutes.put(routes.updateUser, validateJwt, updateUser);
authRoutes.patch(
  routes.changePass,
  [
    check("prevPassword", "El password anterior es necesario").notEmpty(),
    check("password", "El nuevo password es necesario").notEmpty(),
    fieldValidator,
  ],
  validateJwt,
  changePassword
);
authRoutes.delete(routes.deleteUser, validateJwt, deleteUser);

// // LOGIN
// router.post(
//   "/",
//   [
//     check("email", "no es una forma de email correcta").isEmail(),
//     fieldValidator,
//   ],
//   userLogin
// );

// // TODO: XXXX
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(`${process.env.CLIENT_URL}`);
// });

// // renew token

// router.get("test", (req, res) => {});

// module.exports = router;

// const passport = require("passport");

// const {
//   googleAuth,
//   userLogin,
//   userRenewToken,
// } = require("../controllers/authController");
// const { fieldValidator } = require("../middlewares/fieldValidator");
// const { validateJwt } = require("../middlewares/validateJwt");

// wtf
/************PASSPORT********* */

// // route called by the callback if its a success
// router.get("/googleLogin/success", (req, res) => {
//   console.log("success", req.user);
//   if (req.user) {
//     res.status(200).json({
//       success: true,

//       message: "successfull",
//       user: req.user,
//       token: req.user.token,
//       //   cookies: req.cookies
//     });
//   }
// });

// // route called by the callback if its a failure
// router.get("/googleLogin/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "failure",
//   });
// });

// // first call from client, it triggers passport to very google account
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // callback from google
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/api/auth/googleLogin/failed",
//     // successRedirect: `${process.env.CLIENT_URL}/#/auth`,
//   }),
//   googleAuth
// );
