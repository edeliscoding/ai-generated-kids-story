import React from "react";
import connectToMongoDb from "@/app/lib/mongodb";
import Story from "../models/story";

export const getAllStories = async () => {
  try {
    await connectToMongoDb();
    const storiesData = await Story.find({});

    return storiesData;
  } catch (error) {
    console.log(error);
  }
};
