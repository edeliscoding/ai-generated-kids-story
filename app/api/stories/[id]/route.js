import Story from "@/app/models/story";
import mongoDb from "@/app/lib/mongodb";
import CustomStory from "@/app/models/customstory";

// export async function GET(request, { params }) {
//   await mongoDb();

//   const { id } = params;

//   try {
//     const customstory = await CustomStory.findById(id);
//     if (!customstory)
//       return NextResponse.json({ message: "Story not found" }, { status: 404 });
//     return NextResponse.json(customstory, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to fetch story" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request, { params }) {
//   await mongoDb();

//   const { id } = params;
//   try {
//     const { title, content, gallery, status } = await request.json();
//     const updatedStory = await CustomStory.findByIdAndUpdate(
//       id,
//       { title, content, gallery, status },
//       { new: true, runValidators: true }
//     );
//     if (!updatedStory)
//       return NextResponse.json({ message: "Story not found" }, { status: 404 });
//     return NextResponse.json(updatedStory, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error updating story" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const storyId = params.id;

  if (!storyId) {
    return NextResponse.json(
      { error: "Story ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const story = await CustomStory.findById(storyId);

    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  console.log("PUt api called", request);
  const storyId = params.id;
  const data = await request.json();
  const { title, content, gallery, status, author } = data;

  // title: title,
  // content: editor.getHTML(),
  // gallery: gallery,
  // status: "draft",
  // author: userContext._id,
  try {
    await connectToDatabase();
    const updatedStory = await CustomStory.findByIdAndUpdate(storyId, {
      title,
      content,
      gallery,
      status,
      author,
    });
    return NextResponse.json(
      { message: "Successfully updated", updatedStory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update story" },
      { status: 500 }
    );
  }
}
