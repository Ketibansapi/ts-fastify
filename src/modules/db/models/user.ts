/* 
  Uses for initialize schemas nad models
*/

import { Document, Schema, Model, model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  dob: string;
  createdDate: Date;
}

export interface UserModel extends UserDocument {}

export const UserSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    dob: String,
    createdDate: Date
  },
  { collection: "userss" }
);

UserSchema.pre<UserDocument>("save", async function() {
  this.createdDate = new Date();
});

export const User: Model<UserModel> = model<UserModel>(
  "User",
  UserSchema
);