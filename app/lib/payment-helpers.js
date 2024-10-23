"use server";
import connectToDb from "@/app/lib/mongodb";
import UserCredits from "@/app/models/usercredits";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../models/users";
import { ref } from "firebase/storage";
import Payment from "../models/payment";

// export async function handleCheckoutCompleted({ session, stripe}) {

// }

export async function handleCreditsCheckoutCompleted({ userId, credits }) {
  console.log("handleCreditsCheckoutCompleted called with userId:", userId);

  await connectToDb();

  try {
    // Check if the user already has credits saved in the database
    const existingCredits = await UserCredits.findOne({ clerkId: userId });

    if (existingCredits) {
      // If the user already has credits, update the record
      existingCredits.creditsPurchased += credits; // Add the new credits
      existingCredits.purchaseDate = new Date(); // Update the purchase date
      await existingCredits.save();
      await updateCredits({ credits, userId });
      console.log("User credits updated successfully:", existingCredits);
    } else {
      // If no record exists, create a new one
      const newUserCredits = new UserCredits({
        clerkId: userId, // Assuming this is the clerkId
        creditsPurchased: credits,
        creditsUsed: 0,
        purchaseDate: new Date(),
      });
      await newUserCredits.save();
      await updateCredits({ credits, userId });
      console.log("New user credits created successfully:", newUserCredits);
    }
  } catch (error) {
    console.error("Error handling credits checkout:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function updateCredits({ credits, userId }) {
  await connectToDb();
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    throw new Error("User not found");
  }

  user.credit += credits;
  await user.save();
  return NextResponse.json({ credit: user.credit });
  // Your update credits logic here
  console.log("updateCredits called with credits:", credits);
}

export async function insertPayment({
  userId,
  credits,
  session,
  priceId,
  amountPaid,
}) {
  await connectToDb();
  // Your insert payment logic here
  try {
    const payment = new Payment({
      clerkId: userId,
      stripePaymentId: session.id,
      priceId: priceId,
      amount: amountPaid,
      currency: "USD",
      status: "completed",
      creditsAdded: credits,
    });
    await payment.save();
    return NextResponse.json(
      { message: "Payment added to DB successfully" },
      { status: 200, received: true }
    );
  } catch (error) {
    console.error("Error inserting payment:", error);
    return NextResponse.json(
      { message: "Failed to add payment to DB" },
      { status: 500 }
    );
  }
}
// clerkId: { type: String, unique: true, required: true },
// stripePaymentId: {
//   type: String, // The ID of the Stripe payment
//   required: true,
// },
// priceId: {
//   type: String, // The ID of the price in Stripe
//   required: true,
// },
// amount: {
//   type: Number, // Amount paid in the transaction
//   required: true,
// },
// currency: {
//   type: String, // Currency of the transaction (e.g., 'USD')
//   required: true,
// },
// status: {
//   type: String, // Payment status (e.g., 'pending', 'completed', 'failed')
//   required: true,
// },
// creditsAdded: {
//   type: Number, // Credits added to the user after successful payment
//   default: 0,
// },
// refundedAt: {
//   type: Date, // Date when the payment was refunded
//   default: null, // Set to null if not refunded
// },
// createdAt: {
//   type: Date,
//   default: Date.now,
// },
