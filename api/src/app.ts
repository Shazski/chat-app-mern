import express, { NextFunction, Request, Response, Application } from "express";
import { errorHandler } from "./error/error";
import { IncomingMessage, Server, ServerResponse, createServer } from "http";
import { config } from "dotenv";
import { connect } from "./config/db";
import createHttpError from "http-errors";
import userRouter from "./router/user.router";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessageModel";
import User from "./models/UserModel";
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
    methods:["GET","POST"]
  },
});

//db connection
connect();

//router middleware
app.use("/api/user", userRouter);

//middleware for error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  // Check for not found and proceed
  next(new createHttpError.NotFound());
});
app.use(errorHandler);

app.get("/rooms", (req, res) => {
  res.json(rooms);
});
app.options("*", cors(), (req, res) => {
  res.sendStatus(204);
});

async function getLastMessagesFromRoom(room: string) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

function sortRoomMessagesByDate(messages: any) {
  return messages.sort((a: any, b: any) => {
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

//socket connection
io.on("connection", (socket) => {
  console.log("socket connected",socket.id)
  socket.on('new-user', async () => {
    console.log("new user emit")
    const members = await User.find();
    console.log("new-user anoo")
    io.emit('new-user', members) 
  })

  socket.on("join-room", async (room) => {
    socket.join(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
  });
});

const port: Server = server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
