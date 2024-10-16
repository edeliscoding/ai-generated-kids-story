import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, unique: true, required: true },
    userName: String,
    userEmail: String,
    userImage: String,
    credit: { type: Number, default: 2 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
