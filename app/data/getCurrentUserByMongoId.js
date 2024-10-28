"use server";
import { currentUser } from "@clerk/nextjs/server";
import Users from "@/app/models/users";
import connectToMongoDB from "@/app/lib/mongodb";

export const getCurrentUserByMongoId = async (email) => {
  await connectToMongoDB();
  try {
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
};
