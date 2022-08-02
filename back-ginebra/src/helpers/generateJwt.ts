// 343
import jwt from "jsonwebtoken";

// const generateJWT = (uid, col_code, role, imgUrl) => {
export const generateJwt = (
  uid: string,
  username: string,
  email: string,
  role: string = "user"
) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, username, email, role };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED!,
      {
        expiresIn: "30d",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};
