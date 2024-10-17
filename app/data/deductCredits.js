// "use server";
// import connectToMongoDB from "@/app/lib/mongodb";
// import Users from "@/app/models/users";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { revalidatePath } from "next/cache";

// import { redirect } from "next/navigation";
// export async function updateCredits(credits) {
//   console.log("credits from updateCredts", credits);
//   const { userId } = auth();
//   console.log("userId from clerkauth", userId);
//   await connectToMongoDB();
//   try {
//     const user = await Users.findOne({
//       clerkId: userId,
//     });
//     user.credit = user.credit + credits;

//     await user.save();
//   } catch (error) {
//     console.error(error);
//   }
//   revalidatePath("/dashboard");
//   redirect("/dashboard");
// }
"use server";
import { auth } from "@clerk/nextjs/server";
import connectToMongoDB from "@/app/lib/mongodb";
import Users from "@/app/models/users";
import { revalidatePath } from "next/cache";

export async function deductCredits() {
  const { userId } = auth();
  await connectToMongoDB();

  try {
    const user = await Users.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }

    user.credit = user.credit - 1;
    await user.save();

    // Return the updated user data
    return { credit: user.credit };
  } catch (error) {
    console.error("Error deducting credits:", error);
    throw error;
  } finally {
    revalidatePath("/create-story");
  }
}
