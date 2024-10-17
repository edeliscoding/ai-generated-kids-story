"use server";
import connectToMongoDB from "@/app/lib/mongodb";
import Users from "@/app/models/users";
import { auth, currentUser } from "@clerk/nextjs/server";
export async function updateCredits(credits) {
  console.log("credits from updateCredts", credits);
  const { userId } = auth();
  console.log("userId from clerkauth", userId);
  await connectToMongoDB();
  try {
    const user = await Users.findOne({
      clerkId: userId,
    });
    user.credit = user.credit + credits;
    await user.save();
  } catch (error) {
    console.error(error);
  }
}
