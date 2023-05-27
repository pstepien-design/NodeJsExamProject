import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: String,
    email: String,
    firstName: String,
    lastName: String,
    hasClicked: Boolean,
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("Users", userSchema);

export default User;
