import mongoose, { ConnectOptions } from "mongoose";
import dontenv from "dotenv";
dontenv.config();
const MONGO_URL: string = String(process.env.MONGO_URL);

export const connect = async () => {
  mongoose
    .connect(MONGO_URL, {} as ConnectOptions)
    .then(() => {
      console.log("database connected succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
