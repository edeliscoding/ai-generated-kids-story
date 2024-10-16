"use server";
import connectToMongDb from "@/app/lib/mongodb";
import User from "@/app/models/users";
// export async function createUser(userData) {
//   console.log("creating User called", userData);
//   const { userName, userEmail, userImage } = userData;
//   try {
//     await connectToMongDb();
//     const newUser = new User({
//       userName,
//       userEmail,
//       userImage,
//     });
//     const savedUser = await newUser.save();
//     console.log("user saved to db", savedUser);
//     return savedUser;
//   } catch (err) {
//     console.log(err);
//   }
// }
export async function createUser(userData) {
  console.log("createUser called with data:", userData);
  const { userName, userEmail, userImage } = userData;
  try {
    await connectToMongDb();
    const newUser = new User({
      userName,
      userEmail,
      userImage,
    });
    console.log("New user object created:", newUser);
    const savedUser = await newUser.save();
    console.log("User saved to database:", savedUser);
    return savedUser;
  } catch (err) {
    console.error("Error in createUser:", err);
    throw err;
  }
}
