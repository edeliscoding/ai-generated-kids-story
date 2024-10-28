import Story from "@/app/models/story";
import mongoDb from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import CustomStory from "@/app/models/customstory";

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
  await mongoDb();
  const data = await request.json();

  const { title, content, gallery, status, author } = data;
  try {
    // const { title, content, gallery, status, author } = await request.json();
    const newCustomStory = new CustomStory({
      title,
      content,
      gallery,
      status,
      author,
    });
    console.log("newCustomStory", newCustomStory);
    await newCustomStory.save();
    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating story" },
      { status: 500 }
    );
  }
}
