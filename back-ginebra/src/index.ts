import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { authRoutes } from "./routes/authRoutes";
import { dbConnection } from "./database/config";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

const app = express();
app.use(cors());

dbConnection();
// Public directory
app.use(express.static(path.join(__dirname, "/public")));
console.log("review url", process.env.CLIENT_URL);

// reading and parsing
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

// routes
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(process.env.PORT);
  console.log("Server running in port " + process.env.PORT);
});
