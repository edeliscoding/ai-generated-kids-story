"use server";
import connectToMongDb from "@/app/lib/mongodb";
import User from "@/app/models/users";
export async function createUser(userData) {
  console.log("creating User called", userData);
  const { userName, userEmail, userImage } = userData;
  try {
    await connectToMongDb();
    const newUser = new User({
      userName,
      userEmail,
      userImage,
    });
    await newUser.save();
    return newUser;
  } catch (err) {
    console.log(err);
  }
}
