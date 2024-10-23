import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { price, userId, credits } = await req.json();
    // console.log("price", price, "userId", userId, "credits", credits);

    // Create a new Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} Credits`,
            },
            unit_amount: Math.round(price * 100), // Stripe expects the amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}&credits=${credits}`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      metadata: { userId, credits },
    });

    // Return the session ID to the client
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Error creating Stripe session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
