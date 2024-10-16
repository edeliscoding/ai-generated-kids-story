import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    userImage: String,
    credit: { type: Number, default: 2 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
