import mongoose, { ObjectId, Document, Model } from "mongoose";
import isEmail from "validator";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  newMessage: object;
  status: "online" | "offline";
}

export interface IUserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
      validate: {
        validator: (value: string) => isEmail.isEmail(value),
        message: "Invalid email address",
      },
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    newMessage: {
      type: Object,
    },
    status: {
      type: String,
      default: "online",
    },
  },
  {
    minimize: false,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err: any, hash: string) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.statics.findByCredentials = async function (
  email: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ email });

  if (!user) throw new Error("Invalid Credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid Credentials");

  return user;
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
