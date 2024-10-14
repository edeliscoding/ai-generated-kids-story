import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Story from "@/app/models/story";
import connectToDatabase from "@/app/lib/mongodb";

export async function POST(req) {
  const { storyData } = await req.json();
  console.log(storyData);

  try {
    await connectToDatabase();
    const newStory = new Story(storyData);
    await newStory.save();
    return new Response(
      JSON.stringify({ message: "Story created successfully" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating story" }), {
      status: 500,
    });
  }
}
