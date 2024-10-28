import Link from "next/link";
import connectToDatabase from "@/app/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import CustomStory from "@/app/models/customstory";
import { getUserIdByClerkId } from "../lib/getUser-helper";

async function getStories(user_id) {
  await connectToDatabase();
  return await CustomStory.find({ author: user_id });
  //   return db.collection("customStories").find({ author: userId }).toArray();
}

export default async function StoriesPage() {
  const { userId } = auth();

  const user_id = await getUserIdByClerkId(userId);
  const stories = await getStories(user_id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Stories</h1>
      <div className="grid gap-4">
        {stories.map((story) => (
          <Link
            href={`/stories/${story._id}`}
            key={story._id}
            className="p-4 border rounded hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p className="text-gray-600">
              Last edited: {new Date(story.lastSaved).toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
