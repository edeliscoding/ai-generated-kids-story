"use server";
import React from "react";
import CustomStory from "@/app/models/customstory";
import connectToMongoDB from "@/app/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import User from "@/app/models/users";

export const getOwnCustomStories = async () => {
  await connectToMongoDB();
  const { userId } = auth();
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const customStories = await CustomStory.find({
      author: user._id,
    });
    return customStories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
