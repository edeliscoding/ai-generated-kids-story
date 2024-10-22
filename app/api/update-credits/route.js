import { NextResponse } from "next/server";
import Stripe from "stripe";
import { updateCredits } from "@/app/data/updateCredits";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { sessionId } = await request.json();

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "No session ID provided" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const userId = session.metadata.userId;
      const credits = parseInt(session.metadata.credits, 10);

      await updateCredits(credits);

      return NextResponse.json({ success: true, credits });
    } else {
      return NextResponse.json(
        { success: false, error: "Payment not completed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating credits:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update credits" },
      { status: 500 }
    );
  }
}
