import { NextResponse } from "next/server";
import connectToMongoDB from "@/app/lib/mongodb";
import User from "@/app/models/users";

export async function POST(request) {
  console.log("from useUserhook called");
  try {
    const { userId } = await request.json();
    await connectToMongoDB();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // If user doesn't exist, create a new one
      const clerkUser = await fetch(
        `https://api.clerk.dev/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        }
      ).then((res) => res.json());

      user = new User({
        clerkId: userId,
        userEmail: clerkUser.email_addresses[0].email_address,
        userName: `${clerkUser.first_name} ${clerkUser.last_name}`,
        userImage: clerkUser.imageUrl,

        // Add any other fields you want to store
      });

      await user.save();
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in user API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
