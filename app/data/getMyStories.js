import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import Story from "@/app/models/story";
import connectToMongoDB from "@/app/lib/mongodb";
import { clerkClient } from "@clerk/nextjs/server";

export async function getMyStories() {
  "use server";

  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await connectToMongoDB();
    // const user = await clerkClient.users.getUser(userId);
    // const user = await clerkClient.users.getUser(userId);
    // if (!user) {
    //   return new Response(JSON.stringify({ error: "Unauthorized" }), {
    //     status: 401,
    //   });
    // }
    const stories = await Story.find({
      userEmail: user?.emailAddresses[0]?.emailAddress,
    });
    // Return the found stories
    // return new Response(JSON.stringify(stories), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return stories;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
