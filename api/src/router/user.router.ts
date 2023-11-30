import { Request, Response, Router } from "express";
import User, { IUser } from "../models/UserModel";
const router: Router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  console.log(req.body,"redux body")
  const { userName, email, password, profilePic, newMessage }: IUser = req.body;
  try {
    const user: IUser = await User.create({
      userName,
      email,
      password,
      profilePic,
      newMessage
    });
    console.log(user)
    res.status(201).json(user);
  } catch (err: any) {
    let msg: string;
    if (err.code === 11000) {
      msg = "User already exist";
    } else {
      msg = err.message;
    }
    console.log(err);
    res.status(400).json(msg);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  console.log(req.body,"my body")
  const { email, password }: IUser = req.body;
  try {
    const user: IUser | null = await User.findByCredentials(email, password);
    if (user) {
      await User.findByIdAndUpdate(user._id, {
        status: "online",
      });
    }
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json(err.message);
  }
});

export default router;
