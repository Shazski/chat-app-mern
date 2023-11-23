import express, { NextFunction, Request, Response, Application } from "express";
import { errorHandler } from "./error/error";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { config } from "dotenv";
import { connect } from "./config/db";
import createHttpError from "http-errors";
import userRouter from "./router/user.router";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//cors connection
const rooms: string[] = ["general", "tech", "finance", "crypto"];
const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});

//db connection
connect();

//router middleware
app.use("/", userRouter);

//middleware for error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  // Check for not found and proceed
  next(new createHttpError.NotFound());
});
app.use(errorHandler);


const port: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
