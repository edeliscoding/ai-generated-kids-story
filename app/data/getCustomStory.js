import { auth } from "@clerk/nextjs/server";
import CustomStory from "../models/customstory";
import { getUserIdByClerkId } from "../lib/getUser-helper";
import { Mongoose } from "mongoose";
import connectToMongoDb from "@/app/lib/mongodb";
import { isValidObjectId } from "mongoose";
export default async function getCustomStory(storyId) {
  if (!storyId) {
    console.error("No storyId provided to getCustomStory");
    return null;
  }

  // Validate if storyId is a valid MongoDB ObjectId
  if (!isValidObjectId(storyId)) {
    console.error("Invalid storyId format:", storyId);
    return null;
  }

  try {
    await connectToMongoDb();

    const { userId } = auth();
    if (!userId) {
      console.error("No authenticated user found");
      return null;
    }

    const user = await getUserIdByClerkId(userId);
    if (!user) {
      console.error("User not found in database");
      return null;
    }

    console.log("getCustomStory called with storyId:", storyId);

    const story = await CustomStory.findById({
      _id: storyId,
      author: user,
    }).lean();
    if (!story) {
      console.error("Story is not yours to edit", storyId);
      return null;
    }

    return story;
  } catch (error) {
    console.error("Error in getCustomStory:", error);
    throw error;
  }
}
