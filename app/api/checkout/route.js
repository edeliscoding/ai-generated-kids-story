import Stripe from "stripe";
import { NextResponse } from "next/server";

import User from "@/app/models/users";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // if subscription based
    // const { plan, provider } = await request.json();

    const { price, userId, credits, userIdMongo, provider } = await req.json();
    // console.log("price", price, "userId", userId, "credits", credits);
    console.log("userIdMongo", userIdMongo);

    // Create a new Stripe Checkout session
    if (!userId) {
      return NextResponse.json(
        { error: "No user ID provided" },
        { status: 400 }
      );
    }
    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (!user.stripeCustomerId) {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        email: user.userEmail,
        name: user.userName,
      });
      console.log("customer", customer);
      user.stripeCustomerId = customer.id;
      // user.paymentMethods[0].provider = provider;
      // user.paymentMethods[0].paymentMethodId = customer.payment_methods[0].id;
      await user.save();
    }

    // Handle subscription via Stripe - if subscription based
    // if (provider === 'stripe') {
    //   const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     mode: 'subscription',
    //     line_items: [
    //       {
    //         price: process.env[`STRIPE_PRICE_${plan.toUpperCase()}`], // Fetch correct price from environment variables
    //         quantity: 1,
    //       },
    //     ],
    //     success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
    //     cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
    //     customer: user.stripeCustomerId, // Attach the user’s Stripe customer ID
    //   });

    //   return NextResponse.json({ id: session.id });
    // }

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
      metadata: { userId, credits, userIdMongo, provider },
    });

    // Return the session ID to the client
    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Error creating Stripe session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
