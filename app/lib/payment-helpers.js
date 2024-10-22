"use server";
import conntectToDb from "@/app/lib/mongodb";
import Users from "@/app/models/users";

export async function handleCreditsCheckoutCompleted({ userId, credits }) {
  console.log(
    "handleCreditsCheckoutCompleted called with userId:",
    userId,
    "credits:",
    credits
  );
  await conntectToDb();
  try {
    const user = await Users.findOne({
      clerkId: userId,
    });

    if (!user) {
      throw new Error("User not found");
    }
    user.credit = user.credit + credits;
    await user.save();
  } catch (error) {
    console.error(error);
  }
}
