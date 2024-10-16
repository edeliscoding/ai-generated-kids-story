"use server";
import { currentUser } from "@clerk/nextjs/server";
import Users from "@/app/models/users";
import connectToMongoDB from "@/app/lib/mongodb";
// export const getCurrentUser = async () => {
//   console.log("get current user called");
//   await connectToMongoDB();
//   try {
//     const user = await currentUser();

//     if (!user) {
//       throw new Error("Unauthenticated");
//     }
//     const response = await Users.findOne({
//       userEmail: user?.emailAddresses[0]?.emailAddress,
//     });
//     // if (!response) {
//     //   return null;
//     // }
//     return response;
//   } catch (error) {
//     return { message: error.message };
//   }
// };
export const getCurrentUser = async (email) => {
  await connectToMongoDB();
  try {
    const response = await Users.findOne({ userEmail: email });
    return response; // This will be null if no user is found
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};
