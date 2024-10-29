import Story from "@/app/models/story";
import mongoDb from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import CustomStory from "@/app/models/customstory";
import { redirect } from "next/navigation";

export async function GET() {
  await mongoDb();

  try {
    const customstories = await CustomStory.find({});
    return NextResponse.json(customstories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log("API/stories/post called");
  try {
    await mongoDb();

    const data = await request.json();
    const { title, content, gallery, status, author } = data;

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const newCustomStory = new CustomStory({
      title,
      content,
      gallery,
      status,
      author,
    });

    console.log("newCustomStory", newCustomStory);
    await newCustomStory.save();

    return NextResponse.json(newCustomStory, { status: 200 });

    // Option 2: If you want to redirect directly from server
    // return NextResponse.redirect(
    //   new URL(`/stories/${newCustomStory._id}`, request.url)
    // );
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json(
      { message: "Error creating story", error: error.message },
      { status: 500 }
    );
  }
}
