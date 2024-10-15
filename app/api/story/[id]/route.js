// File: app/api/story/[id]/route.js
import { NextResponse } from "next/server";
import Story from "@/app/models/story";
import connectToMongoDB from "@/app/lib/mongodb";

export async function GET(request, { params }) {
  const { id } = params; // Get the story id from params
  await connectToMongoDB();
  //   const tempId = "670ed634271640abaf432d87";

  try {
    const story = await Story.findById(id);
    return NextResponse.json(story);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch story" },
      { status: 500 }
    );
  }
}
