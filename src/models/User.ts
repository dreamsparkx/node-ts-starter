import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { generateJWT } from "../util/jwt";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  comparePassword: comparePasswordFunction;
  generateJWTToken: generateJWTTokenFunction;
  createdAt: Date;
  updatedAt: Date;
};
/**
 *
 * @param userPassword - the password that user inputs
 * @param cb - callback function that results error if there is one or returns isMatch
 */
export type comparePasswordFunction = (
  userPassword: string,
  cb: (err: Error, isMatch: boolean) => void,
) => void;

export type generateJWTTokenFunction = () => string;

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this as UserDocument;

  if (!user.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
});
/**
 * @param userPassword text
 * @param cb function
 */
const comparePassword: comparePasswordFunction = function (
  userPassword,
  cb,
) {
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const generateJWTToken: generateJWTTokenFunction = function () {
  return generateJWT({
    _id: this._id,
    email: this.email,
  });
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.generateJWTToken = generateJWTToken;

export const User = mongoose.model<UserDocument>("User", userSchema);
export type JWTUser = {
  _id: string;
  email: string;
  iat: number;
  exp: number;
};
