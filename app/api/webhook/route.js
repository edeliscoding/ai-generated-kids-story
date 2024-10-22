import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateCredits } from "@/app/data/updateCredits"; // import your update credits logic
import { buffer } from "micro"; // helps process raw body from stripe
import { handleCreditsCheckoutCompleted } from "@/app/lib/payment-helpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body parsing
  },
};

export async function POST(req) {
  const buf = await buffer(req.body);
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Ensure this secret is in your .env.local
    );
  } catch (err) {
    console.error("Error verifying Stripe signature:", err.message);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Fetch user's credits or relevant information from session metadata
    const userId = session.metadata.userId;
    const creditString = session.metadata.credits;
    const credits = parseInt(creditString);
    console.log("Webhook received - User ID:", userId, "Credits:", credits);

    // Update the user's credits in your database
    try {
      await handleCreditsCheckoutCompleted({ userId, credits });
      // 'use server';
      //   await updateCredits(credits); // Call your updateCredits function
      console.log("Attempting to update credits...");
      // Make sure to pass userId if required
      console.log(`Credits added successfully to user ${userId}`);
    } catch (error) {
      console.error("Error updating credits:", error);
      // Log the full error object for more details
      console.error(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
  }

  return NextResponse.json({ received: true });
}
