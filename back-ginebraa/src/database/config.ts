// 331
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

const dbOptions: ConnectOptions = {
  dbName: "misc",
};

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN!, dbOptions);
    console.log("DB ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar BD");
  }
};
